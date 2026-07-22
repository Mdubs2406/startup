const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// {userName, password}
let usersLogin = [];

// [userName, {date, time, desc}, ...]
let allUserJournals = [];

// {userName, streak, lastDay}
let allUserStats = [];

// {name, desc, date, time}
let communityBoard = [];

let totCount = 0;
let dayCount = 0;

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('auth/create', async (req, res) => {

});

apiRouter.post('auth/login', async (req, res) => {

});

apiRouter.delete('auth/logout', async (req, res) => {

});

const checkAuth = async (req, res, next) => {};

apiRouter.get('/home', checkAuth, (req, res) => {
  res.send([totalCount, dayCount]);
});

apiRouter.post('/home/count', checkAuth, (req, res) => {
  updateCounts();
  res.send([totalCount, dayCount]);
});

apiRouter.get('/community', checkAuth, (req, res) => {
  res.send(communityBoard);
});

apiRouter.post('/community/post', checkAuth, (req, res) => {
  updatePosts(req.body);
  res.send(communityBoard);
});

apiRouter.get('/journal', checkAuth, (req, res) => {
  res.send(findJournal(req.body));
});

apiRouter.post('jounrnal/write', checkAuth, (req, res) => {
  res.send(updateJounrnal(req.body));
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message});
});

app.use((req, res) => {
  res.send('index.html', { root: 'public'});
});

// supporting functions
function updatePosts(newPost) {
  communityBoard.push(newPost);
  return communityBoard;
}

function updateJournal(newList) {
   const userName = newList[0];

   for (const [i, prevList] of allUserJournals.entries()) {
    if (userName === prevList[0]) {
      allUserJournals[i] = newList;
      return;
    }
   }

   allUserJournals.push(newList);
}

function findJournal(userName) {
  const userList = allUserJournals.find(list => list[0] === userName);

  return userList ?? [userName];
}

function updateCounts(userName) {
  totalCount++;
  dayCount++;
}