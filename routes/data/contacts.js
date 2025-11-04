const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let database;

const initDB = (callback) => {
  if (database) {
    console.log("Database is already initialized!");
    return callback(null, database);
  }
  //   MongoClient.connect(process.env.MONGODB_URL)
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db("Contacts");
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};
module.exports = { initDB, getDB };
