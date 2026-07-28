const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const { deeds } = require('./deedPrompts');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

async function seedDeeds() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db('startup');
    const deedCollection = db.collection('deeds');

    await deedCollection.insertMany(deeds);

    console.log(`Successfully inserted ${deeds.length} deeds.`);
  } catch (error) {
    console.error('Error inserting deeds:', error);
  } finally {
    await client.close();
  }
}

seedDeeds();