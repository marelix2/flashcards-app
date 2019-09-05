'use strict';
const mongodb = require('mongodb');
const {UNPROCESSABLE_ENTITY} = require('../constants/statusCodes');

const response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message, null, 2),
    };
};

const emptyFieldsError = (jsonArr) => {
    const emptyFields = [];

    for (let i in jsonArr) {
        emptyFields.push(jsonArr[i]);
    }

    const errorMessage = emptyFields.length === 1 ?
        {"message": "Empty field: " + emptyFields.join(", ")} :
        {"message": "Empty fields: " + emptyFields.join(", ")};

    return response(UNPROCESSABLE_ENTITY, errorMessage);
};

const validateInput = (json) => {
    return Object
        .keys(json)
        .filter(o1 => json[o1] === "")
};
const skipId = (json) => {
    const jsonCopy = Object.assign({}, json);
    if (jsonCopy.hasOwnProperty('_id')) {
        delete jsonCopy['_id'];
    }
    return jsonCopy
};

const extractId = (json) => {
    return {
        '_id': json['_id']
    };
};

const extractObjectId = (json) => {
    return {
        '_id': new mongodb.ObjectID(json['_id'])
    };
};

const isIdParameter = (strParam) => {
    return Object.keys(strParam).filter(o1 => o1 === '_id').length === 1;
};

module.exports = {
    response,
    validateInput,
    emptyFieldsError,
    isIdParameter,
    extractId,
    extractObjectId,
    skipId
};