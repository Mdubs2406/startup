const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const { deedPrompts } = require('./deedPrompts');

const cookieName = 'authKey';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// {userEmail, password}
let usersLogin = [];

// [userEmail, {date, time, desc}, ...]
let allUserJournals = [];

// [{userEmail, streak, lastCompleted}, ...]
let allUserStats = [];

// {name, desc, date, time}
let communityBoard = [];

// Non-zero values to simulate DB
let totalCount = 107;
let dayCount = 11;

let currentDeed = deedPrompts();
let lastUpdate = new Date().toDateString();
let countDate = new Date().toDateString();

let apiRouter = express.Router();
app.use('/api', apiRouter);

const validateEmail = (req, res, next) => {
  const email = req.body.email;

  if (!email || !email.includes('@') || email.indexOf('@') === email.length - 1) {
    return res.status(400).send({
      msg: 'Please enter a valid email address.'
    });
  }

  next();
};

apiRouter.post('/users/create', validateEmail, async (req, res) => {
  if (await findAccount('email', req.body.email)) {
    res.status(409).send({ msg: 'You already have an account. Use login instead.' });
  } else {
    const user = await createAccount(req.body.email, req.body.password);

    setCookie(res, user.authToken);
    res.send({ email: user.email });
  }
});

apiRouter.post('/users/signin', validateEmail, async (req, res) => {
  const user = await findAccount('email', req.body.email);

  if (!user) {
    res.status(404).send({ msg: 'Account not found. Please create an account.'});
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).send({ msg: 'Incorrect Email or Password.' });
      return;
    }

  user.authToken = uuid.v4();
  setCookie(res, user.authToken);
  res.send({ email: user.email });
});

apiRouter.delete('/users/signout', async (req, res) => {
  const user = await findAccount('authToken', req.cookies[cookieName]);

  if (user) {
    delete user.authToken;
  }

  res.clearCookie(cookieName);
  res.status(204).end();
});


apiRouter.get('/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');

    if (!response.ok) {
      throw new Error('Could not retrieve quote');
    }

    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ msg: 'Could not retrieve quote' });
  }
});

const checkAuth = async (req, res, next) => {
  const user = await findAccount('authToken', req.cookies[cookieName]);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'User not authorized.' });
  }
};

apiRouter.get('/home', checkAuth, (req, res) => {
  const stats = findUserStats(req.user);
  const today = new Date().toDateString();
  const completedToday = stats.lastCompleted === today;

  updateDeed();
  updateDayCount();

  res.send({
    totalCount,
    dayCount,
    streak: stats.streak,
    completedToday,
    currentDeed,
  });
});

apiRouter.post('/home/count', checkAuth, (req, res) => {
  const result = updateCounts(req.user);

  if (result.alreadyCompleted) {
    res.status(409).send({
      msg: 'You have already completed today\'s good deed.',
      totalCount,
      dayCount,
      streak: result.stats.streak,
      completedToday: true,
    });
    return;
  }

  res.send({
    totalCount,
    dayCount,
    streak: result.stats.streak,
    completedToday: true,
  });
});

apiRouter.get('/community', checkAuth, (req, res) => {
  res.send(communityBoard);
});

apiRouter.post('/community/post', checkAuth, (req, res) => {
  communityBoard.push({
    author: req.user.email.split('@')[0],
    content: req.body,
    postDate: new Date().toISOString(),
  });
  res.send(communityBoard);
});

apiRouter.get('/journal', checkAuth, (req, res) => {
  res.send(findJournal(req.user));
});

apiRouter.post('/journal/save', checkAuth, (req, res) => {
  res.send(updateJournal(req));
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, msg: err.message });
});

app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// supporting functions //

// Login
async function createAccount(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const account = {
    email,
    password: passwordHash,
    authToken: uuid.v4(),
  };

  usersLogin.push(account);
  return account;
}

function findAccount(idType, value) {
  return usersLogin.find(user => user[idType] === value);
}

function setCookie(res, token) {
  res.cookie(cookieName, token, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })
}

// Journal
function findJournal(user) {
  const userList = allUserJournals.find(list => list[0] === user.email);

  return userList ?? [user.email];
}

function updateJournal(req) {
  for (const [i, List] of allUserJournals.entries()) {
    if (req.user.email === List[0]) {
      allUserJournals[i].push(req.body);
      return allUserJournals[i];
    }
  }

  allUserJournals.push([req.user.email, req.body]);
  return [req.user.email, req.body];
}

// Home
function findUserStats(user) {
  let stats = allUserStats.find(stats => stats.email === user.email);

  if (!stats) {
    stats = {
      email: user.email,
      streak: 0,
      lastCompleted: null,
    };

    allUserStats.push(stats);
  }

  return stats;
}

function updateDayCount() {
  const today = new Date().toDateString();

  if (countDate !== today) {
    countDate = today;
    dayCount = 0;
  }
}

function updateCounts(user) {
  const stats = findUserStats(user);
  const today = new Date().toDateString();

  updateDayCount();

  if (stats.lastCompleted === today) {
    return {
      stats,
      alreadyCompleted: true,
    };
  }

  totalCount++;
  dayCount++;
  stats.streak++;
  stats.lastCompleted = today;

  return {
    stats,
    alreadyCompleted: false,
  };
}

function updateDeed() {
  const today = new Date().toDateString();

  if (lastUpdate !== today) {
    lastUpdate = today;
    currentDeed = deedPrompts();
  }
}

// Service hosting
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});