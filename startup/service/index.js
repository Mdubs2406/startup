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

// {userName, streak, lastCompleted}
let allUserStats = [];

// {name, desc, date, time}
let communityBoard = [];

let totalCount = 0;
let dayCount = 0;

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {

});

apiRouter.post('/auth/login', async (req, res) => {

});

apiRouter.delete('/auth/logout', async (req, res) => {

});

const checkAuth = async (req, res, next) => {};

apiRouter.get('/home', checkAuth, (req, res) => {
  const stats = findUserStats(req.body);

  res.send({
    totalCount,
    dayCount,
    streak: stats.streak
  });
});

apiRouter.post('/home/count', checkAuth, (req, res) => {
  const stats = updateCounts(req.body);

  res.send({
    totalCount,
    dayCount,
    streak: stats.streak
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
  res.send(findJournal(req.body));
});

apiRouter.post('/journal/write', checkAuth, (req, res) => {
  res.send(updateJournal(req.body));
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message});
});

app.use((req, res) => {
  res.send('index.html', { root: 'public'});
});

// supporting functions
function updateJournal(journalData) {
   for (const [i, prevList] of allUserJournals.entries()) {
    if (journalData.userName === prevList[0]) {
      allUserJournals[i] = journalData.list;
      return journalData.list;
    }
   }

   allUserJournals.push(journalData.list);
   return journalData.list;
}

function findJournal(userData) {
  const userList = allUserJournals.find(list => list[0] === userData.userName);

  return userList ?? [userData.userName];
}

function findUserStats(userData) {
  let stats = allUserStats.find(stats => stats.userName === userData.userName);

  if (!stats) {
    stats = {
      userName: userData.userName,
      streak: 0,
      lastCompleted: null
    }

    allUserStats.push(stats);
  }

  return stats;
}

function updateCounts(userData) {
  totalCount++;
  dayCount++;

  const stats = findUserStats(userData.userName);
  const today = new Date().toDateString();

  if (stats.lastCompleted !== today) {
    stats.streak++;
    stats.lastCompleted = today;
  }

  return stats;
}