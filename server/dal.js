const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'badbankremix';
let db = null;

// connect to Mongo
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err)
  } else {
  console.log('Connected successfuly to db server');

  // connect to project database
  db = client.db(dbName);
  }
});

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance:0};
    collection.insertOne(doc, {w:1}, (err, result) => {
      err ? reject(err) : resolve(doc);
    });
  });
};

// show all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  })
}

module.exports = { create, all };