'use strict';
const MongoClient = require('mongodb').MongoClient;
const {uri, mongoDB} = require('../config/db');
const client = new MongoClient(uri, {useNewUrlParser: true});
const {response} = require('../service/generic');
const {SUCCESSFUL_RESPONSE, INTERNAL_SERVER_ERROR} = require('../constants/statusCodes');
const {FLASHCARDS} = require('../constants/collections');

module.exports.save = (event, context, callback) => {
    const data = JSON.parse(event.body);
    client.connect()
        .then((client, err) =>
            client.db(mongoDB).collection(FLASHCARDS).insertOne(data))
        .then((result) =>
            callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Flashcard saved', flashcard: result.ops})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
        .finally(() => client.close());
};
