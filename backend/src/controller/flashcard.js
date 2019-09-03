'use strict';
const {uri, mongoDB, connectToDatabase} = require('../config/db');
const {response, validateInput, emptyFieldsError, extractId, isIdParameter, extractObjectId, skipId} = require('../service/generic');
const {SUCCESSFUL_RESPONSE, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, NOT_FOUND} = require('../constants/statusCodes');
const {FLASHCARDS} = require('../constants/collections');

const save = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    const inputErrors = validateInput(data);

    if (Array.isArray(inputErrors) && inputErrors.length) {
        callback(null, emptyFieldsError(inputErrors));
        return;
    }

    connectToDatabase(uri)
        .then((client, err) => client.db(mongoDB).collection(FLASHCARDS).insertOne(data))
        .then((result) =>
            callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Flashcard saved', _id: result.insertedId})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
};

const remove = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    const inputErrors = validateInput(data);

    if (!isIdParameter(data)) {
        callback(null, response(UNPROCESSABLE_ENTITY, {message: "Input should contain only _id"}));
        return;
    }

    if (Array.isArray(inputErrors) && inputErrors.length) {
        callback(null, emptyFieldsError(inputErrors));
        return;
    }

    connectToDatabase(uri)
        .then((client, err) => client.db(mongoDB).collection(FLASHCARDS).deleteOne(extractObjectId(data)))
        .then((result) =>
            result.deletedCount !== 0 ?
                callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Flashcard deleted', ...extractId(data)})) :
                callback(null, response(NOT_FOUND, {message: `Flashcard with _id: ${data._id} does not exist`})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
};

const update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    const inputErrors = validateInput(data);

    if (Array.isArray(inputErrors) && inputErrors.length) {
        callback(null,  emptyFieldsError(inputErrors));
        return;
    }

    if (!isIdParameter(data)) {
        callback(null, response(UNPROCESSABLE_ENTITY, {message: "Input should contain _id"}));
        return;
    }

     connectToDatabase(uri)
        .then((client, err) => client.db(mongoDB).collection(FLASHCARDS).updateOne(extractObjectId(data), {$set: skipId(data)}))
        .then((result) =>
             result.matchedCount === 1 ?
                callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Flashcard updated', flashcard: data})) :
                callback(null, response(NOT_FOUND, {message: `Flashcard with _id: ${data._id} does not exist`})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
};

const getAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase(uri)
        .then((client, err) => client.db(mongoDB).collection(FLASHCARDS).find({}).toArray())
        .then((result) =>
            callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Flashcards', flashcard: result})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
};

const getBy = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const stringParameters = event.queryStringParameters;

    if (stringParameters === undefined) {
        callback(null, response(UNPROCESSABLE_ENTITY, {message: 'Missing query string parameter'}));
        return;
    }

    if (Object.keys(stringParameters).length > 1) {
        callback(null, response(UNPROCESSABLE_ENTITY, {message: 'You can pass only 1 query string parameter'}));
        return;
    }

    connectToDatabase(uri)
        .then((client, err) =>
            isIdParameter(stringParameters) ?
                client.db(mongoDB).collection(FLASHCARDS).find(extractObjectId(stringParameters)).toArray() :
                client.db(mongoDB).collection(FLASHCARDS).find(stringParameters).toArray())
        .then((result) =>
            result.length !== 0 ?
                callback(null, response(SUCCESSFUL_RESPONSE, {message: 'Query result', flashcard: result})) :
                callback(null, response(NOT_FOUND, {message: 'No flashcards were found', flashcard: result})))
        .catch(err => callback(response(INTERNAL_SERVER_ERROR, err)))
};

module.exports = {
    getAll,
    save,
    update,
    remove,
    getBy,
};
