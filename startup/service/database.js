const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('user');
const postCollection = db.collection('post');
const journalCollection = db.collection('journal');
const statsCollection = db.collection('stats');
const allUserStatsCollection = db.collection('allUserStats');
const deedCollection = db.collection('deeds');
const dailyDeedCollection = db.collection('dailyDeed');

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

function getUserByToken(authToken) {
  return userCollection.findOne({ authToken: authToken });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email}, { $set: user});
}

async function removeUserToken(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { authToken: 1 } });
}

async function addPost(post) {
  await postCollection.insertOne(post);
}

async function getAllPosts() {
  return postCollection.find().toArray();
}

async function addJournalEntry(entry, email) {
  const newJournal = await journalCollection.findOneAndUpdate(
    { email: email },
    { $push: { record: entry } },
    { 
      upsert: true,
      returnDocument: 'after' 
    }
  );

  return newJournal.record;
}

async function getJournalEntries(email) {
  const journal = await journalCollection.findOne({ email: email });

  if (!journal) {
    return [];
  }

  return journal.record;
}

async function updateGlobalStats(stats) {
  await statsCollection.updateOne({ _id: 'stats' }, { $set: stats }, { upsert: true });
}

async function getGlobalStats() {
  const today = new Date().toDateString();

  const stats = await statsCollection.findOneAndUpdate(
    { _id: 'stats' },
  {
    $setOnInsert: {
      _id: 'stats',
      totalCount: 0,
      dayCount: 0,
      countDate: today,
  }},
  {
    upsert: true,
    returnDocument: 'after',
  });

  return stats;
}

async function updateUserStats(stats) {
  await allUserStatsCollection.updateOne(
    { email: stats.email }, 
    { $set: {
        streak: stats.streak,
        lastCompleted: stats.lastCompleted,
      }
    }
   );
}

async function getUserStats(email) {
  const result = await allUserStatsCollection.findOneAndUpdate(
    { email }, 
    { 
      $setOnInsert: {
      email,
      streak: 0,
      lastCompleted: null,
    }}, 
    {
      upsert: true,
      returnDocument: 'after',
    });
  
    return result;
}

async function updateDaily(current, today) {
  const newDeed = await deedCollection.aggregate([
    { $sample: { size: 1 } }
  ]).next();

  if (current) {
    await deedCollection.insertOne(current);
    await dailyDeedCollection.deleteOne({ _id: current._id });
  }
  
  const updatedDeed = {...newDeed, date: today};
  await dailyDeedCollection.insertOne(updatedDeed);
  await deedCollection.deleteOne({ _id: newDeed._id });

  return updatedDeed;
}

async function getDeed() {
  const today = new Date().toDateString();
  const dailyDeed = await dailyDeedCollection.findOne({});

  if (!dailyDeed || dailyDeed.date !== today) {
    return updateDaily(dailyDeed, today);
  }

  return dailyDeed;
}

async function completeDeed(email) {
  const today = new Date().toDateString();
  const userStats = await getUserStats(email);

  if (userStats.lastCompleted === today) {
    const globalStats = await getGlobalStats();

    return {
      alreadyCompleted: true,
      userStats,
      globalStats,
    };
  }

  const globalStats = await getGlobalStats();

  if (globalStats.countDate !== today) {
    globalStats.dayCount = 0;
    globalStats.countDate = today;
  }

  userStats.streak++;
  userStats.lastCompleted = today;
  globalStats.totalCount++;
  globalStats.dayCount++;

  await updateGlobalStats(globalStats);
  await updateUserStats(userStats);

  return {
    alreadyCompleted: false,
    userStats,
    globalStats,
  };
}

async function getHomeData(email) {
  const userStats = await getUserStats(email);
  const globalStats = await getGlobalStats();
  const currentDeed = await getDeed();

  const today = new Date().toDateString();

  return {
    totalCount: globalStats.totalCount,
    dayCount: globalStats.dayCount,
    streak: userStats.streak,
    completedToday: userStats.lastCompleted === today,
    currentDeed,
  };
}

module.exports = {
  getUserByEmail,
  getUserByToken,
  addUser,
  updateUser,
  removeUserToken,
  addPost,
  getAllPosts,
  addJournalEntry,
  getJournalEntries,
  updateGlobalStats,
  getGlobalStats,
  getUserStats,
  getDeed,
  completeDeed,
  updateUserStats,
  getHomeData,
};