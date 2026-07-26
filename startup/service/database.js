const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('user');
const postCollection = db.collection('post');
const journalCollection = db.collection('journal');
const statsCollection = db.collection('')

// For connection error handling and testing
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUserByEmail(email) {
  return userCollection.findOne({ email: email});
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUserToken(user) {
  await userCollection.updateOne({ email: user.email}, { $set: user});
}

async function removeUserToken(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { authToken: 1 } });
}

async function addPost(post) {
  await postCollection.insertOne(post);
}