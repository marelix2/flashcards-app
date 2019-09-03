'use strict';
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = process.env.DB_NAME;
const mongoUser = process.env.DB_USER;
const mongoPass = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@flashcards-ldxf4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

let cachedDb = null;

const connectToDatabase  = (uri)  => {
    if (cachedDb) {
        return Promise.resolve(cachedDb);
    }

    return MongoClient.connect(uri)
        .then(db => {
            cachedDb = db;
            return cachedDb;
        });
};

module.exports = {
    connectToDatabase,
    uri,
    DB_NAME
};