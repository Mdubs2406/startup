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

// {userEmail, streak, lastCompleted}
let allUserStats = [];

// {name, desc, date, time}
let communityBoard = [];

let totalCount = 0;
let dayCount = 0;

let currentDeed = deedPrompts();
let lastUpdate = new Date().toDateString();
let countDate = new Date().toDateString();

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/users/create', async (req, res) => {
  if (await findAccount('email', req.body.email)) {
    res.status(409).send({msg: 'You already have an account. Use login instead.'});
  } else {
    const user = await createAccount(req.body.email, req.body.password);

    setCookie(res, user.authToken);
    res.send({ email: user.email });
  }
});

apiRouter.post('/users/signin', async (req, res) => {
  const user = await findAccount('email', req.body.email);

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.authToken = uuid.v4();
    setCookie(res, user.authToken);
    res.send({ email: user.email });
    return;
  } else {
    res.status(401).send({ msg: 'Incorrect Email or Password.' });
  }
});

apiRouter.delete('/users/signout', async (req, res) => {
  const user = await findAccount('authToken', req.cookies[cookieName]);

  if (user) {
    delete user.authToken;
  }

  res.clearCookie(cookieName);
  res.status(204).end();
});

const checkAuth = async (req, res, next) => {
  const user = await findAccount('authToken', req.cookies[cookieName]);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'User not authorized.'});
  }
};

apiRouter.get('/home', checkAuth, (req, res) => {
  const stats = findUserStats(req.user);
  updateDeed();

  res.send({
    totalCount,
    dayCount,
    streak: stats.streak,
    currentDeed,
  });
});

apiRouter.post('/home/count', checkAuth, (req, res) => {
  const stats = updateCounts(req.user);

  res.send({
    totalCount,
    dayCount,
    streak: stats.streak,
  });
});

apiRouter.get('/community', checkAuth, (req, res) => {
  res.send(communityBoard);
});

apiRouter.post('/community/post', checkAuth, (req, res) => {
  communityBoard.push(req.body);
  res.send(communityBoard);
});

apiRouter.get('/journal', checkAuth, (req, res) => {
  res.send(findJournal(req.user));
});

apiRouter.post('/journal/write', checkAuth, (req, res) => {
  res.send(updateJournal(req));
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message});
});

app.use((req, res) => {
  res.send('index.html', { root: 'public'});
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
    }

    allUserStats.push(stats);
  }

  return stats;
}

function updateCounts(user) {
  const stats = findUserStats(user);
  const today = new Date().toDateString();

  if (countDate !== today) {
    countDate = today;
    dayCount = 0;
  }

  totalCount++;
  dayCount++;

  if (stats.lastCompleted !== today) {
    stats.streak++;
    stats.lastCompleted = today;
  }

  return stats;
}

function updateDeed() {
  const today = new Date().toDateString();

  if (lastUpdate !== today) {
    lastUpdate = today;
    currentDeed = deedPrompts();
  } 
}