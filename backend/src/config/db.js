'use strict';

const DB_NAME = process.env.DB_NAME;
const mongoUser = process.env.DB_USER;
const mongoPass = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@flashcards-ldxf4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


module.exports = {
    uri,
    DB_NAME
};