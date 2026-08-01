const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { setUpWebSocket } = require('./setUpWebSocket.js');

const cookieName = 'authKey';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// API routing
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Service and webSocket hositng
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const httpService = app.listen(port, () => {
  console.log(`Listinen on port ${port}`);
});
const wsServer = setUpWebSocket(httpService);

// Email validation
const validateEmail = (req, res, next) => {
  const email = req.body.email;

  if (!email || !email.includes('@') || email.indexOf('@') === email.length - 1) {
    return res.status(400).send({
      msg: 'Please enter a valid email address.'
    });
  }

  next();
};

// API routes
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
    res.status(404).send({ msg: 'Account not found. Please create an account.' });
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.status(401).send({ msg: 'Incorrect Email or Password.' });
    return;
  }

  user.authToken = uuid.v4();
  await DB.updateUser(user);
  setCookie(res, user.authToken);
  res.send({ email: user.email });
});

apiRouter.delete('/users/signout', async (req, res) => {
  const user = await findAccount('authToken', req.cookies[cookieName]);

  if (user) {
    delete user.authToken;
    await DB.removeUserToken(user);
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

apiRouter.get('/home', checkAuth, async (req, res) => {
  const homeData = await DB.getHomeData(req.user.email);
  res.send(homeData);
});

apiRouter.post('/home/count', checkAuth, async (req, res) => {
  const result = await DB.completeDeed(req.user.email);

  if (result.alreadyCompleted) {
    res.status(409).send({
      msg: 'You have already completed today\'s good deed.',
      totalCount: result.globalStats.totalCount,
      dayCount: result.globalStats.dayCount,
      streak: result.userStats.streak,
      completedToday: true,
    });
    return;
  }

  wsServer.broadcast({ 
    type: 'DEED_COMPLETE',
    data: {
      totalCount: result.globalStats.totalCount,
      dayCount: result.globalStats.dayCount,
    },
  });

  res.send({
    totalCount: result.globalStats.totalCount,
    dayCount: result.globalStats.dayCount,
    streak: result.userStats.streak,
    completedToday: true,
  });
});

apiRouter.get('/community', checkAuth, async (req, res) => {
  const communityBoard = await DB.getAllPosts();
  res.send(communityBoard);
});

apiRouter.post('/community/post', checkAuth, async (req, res) => {
  const post = {
    author: req.user.email.split('@')[0],
    content: req.body,
    postDate: new Date().toDateString(),
  };

  await DB.addPost(post);

  wsServer.broadcast({
    type: 'NEW_COMMUNITY_POST',
    data: {
      post,
      author: req.user.email,
    }
  });

  res.status(201).end();
});

apiRouter.get('/journal', checkAuth, async (req, res) => {
  const journal = await DB.getJournalEntries(req.user.email);
  res.send(journal);
});

apiRouter.post('/journal/save', checkAuth, async (req, res) => {
  const newJournal = await DB.addJournalEntry(req.body, req.user.email);
  res.send(newJournal);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, msg: err.message });
});

app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// supporting functions
async function createAccount(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const account = {
    email,
    password: passwordHash,
    authToken: uuid.v4(),
  };

  await DB.addUser(account);
  return account;
}

function findAccount(idType, value) {
  if (idType === 'email') {
    return DB.getUserByEmail(value);
  }
  return DB.getUserByToken(value);
}

function setCookie(res, token) {
  res.cookie(cookieName, token, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })
}
