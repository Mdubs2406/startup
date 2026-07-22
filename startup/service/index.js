const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let usersLogin = [];
let userJournals = [];
let communityBoard = [];

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('auth/create', async (req, res) => {

});

apiRouter.post('auth/login', async (req, res) => {

});

apiRouter.delete('auth/logout', async (req, res) => {

});

const checkAuth = async (req, res, next) => {};

apiRouter.get('/home', checkAuth, (req, res) => {});

apiRouter.get('/community', checkAuth, (req, res) => {});

apiRouter.post('/community/post', checkAuth, (req, res) => {});

apiRouter.get('/journal', checkAuth, (req, res) => {});

apiRouter.post('jounrnal/write', checkAuth, (req, res) => {});

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

function updateJounrnal(newList) {
   const userName = newList[0];
   for (const [i, prevList] of userJournals.entries()) {
    if (userName === prevList[0]) {
      userJournals[i] = newList;
    }
   }
}