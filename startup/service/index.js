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
let usersJournal = [];
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