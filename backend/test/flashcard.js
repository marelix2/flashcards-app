'use strict';
const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const saveFlashcard = mochaPlugin.getWrapper('saveFlashcard', '/src/controller/flashcard.js', 'save');
const removeFlashcard = mochaPlugin.getWrapper('removeFlashcard', '/src/controller/flashcard.js', 'remove');
const updateFlashcard = mochaPlugin.getWrapper('updateFlashcard', '/src/controller/flashcard.js', 'update');
const getAllFlashcards = mochaPlugin.getWrapper('getAllFlashcards', '/src/controller/flashcard.js', 'getAll');
const getByFlashcards = mochaPlugin.getWrapper('getByFlashcards', '/src/controller/flashcard.js', 'getBy');

let correctInput = JSON.stringify({name: 'savedfromtest', author: 'integrationtests'});
let incorrectInput = JSON.stringify({name: '', author: ''});
let updateInput = {name: 'updatedName', author: 'updatedAuthor'};

describe('flashcard controller', () => {

    context('get all flashcards', () => {
        before((done) => {
            done();
        });
        it('get all flashcards not empty return', () => {
            return getAllFlashcards.run({})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.flashcard).to.not.be.empty;
                })
        });
        it('get all flashcards status code 200', () => {
            return getAllFlashcards.run({})
                .then((response) => expect(response.statusCode).to.equal(200))
        });
    });

    context('save flashcard', () => {
        before((done) => {
            done();
        });
        it('save flashcard successfully', () => {
            return saveFlashcard.run({body: correctInput})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body).to.have.property('_id')
                })
        });
        it('save flashcard successfully status code 200', () => {
            return saveFlashcard.run({body: correctInput})
                .then((response) => expect(response.statusCode).to.equal(200))
        });
        it('save flashcard with incorrectInput', () => {
            return saveFlashcard.run({body: incorrectInput})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Empty fields: name, author')
                })
        });
        it('save flashcard with incorrectInput status code 422', () => {
            return saveFlashcard.run({body: incorrectInput})
                .then((response) => expect(response.statusCode).to.equal(422))
        });
    });

    context('remove flashcard', () => {
        before((done) => {
            done();
        });
        it('remove flashcard successfully', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => removeFlashcard.run({body: JSON.stringify({_id: flashcard._id})}))
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Flashcard deleted')
                })
        });
        it('remove flashcard successfully status code 200', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => removeFlashcard.run({body: JSON.stringify({_id: flashcard._id})}))
                .then((response) => expect(response.statusCode).to.equal(200))
        });
        it('remove flashcard with non existing _id ', () => {
            return removeFlashcard.run({body: JSON.stringify({_id: '5d6d75be9ac0e43204da7c11'})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Flashcard with _id: 5d6d75be9ac0e43204da7c11 does not exist');
                })
        });
        it('remove flashcard with non existing _id status code 404', () => {
            return removeFlashcard.run({body: JSON.stringify({_id: '5d6d75be9ac0e43204da7c11'})})
                .then((response) => expect(response.statusCode).to.equal(404));
        });
        it('remove flashcard with missing _id key', () => {
            return removeFlashcard.run({body: JSON.stringify({})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Input should contain only _id');
                })
        });
        it('remove flashcard with missing _id key status code 422', () => {
            return removeFlashcard.run({body: JSON.stringify({})})
                .then((response) => expect(response.statusCode).to.equal(422));
        });
        it('remove flashcard with missing _id value', () => {
            return removeFlashcard.run({body: JSON.stringify({_id: ''})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Empty field: _id');
                })
        });
        it('remove flashcard with missing _id value status code 422', () => {
            return removeFlashcard.run({body: JSON.stringify({_id: ''})})
                .then((response) => expect(response.statusCode).to.equal(422));
        });
    });

    context('update flashcard', () => {
        before((done) => {
            done();
        });
        it('update flashcard successfully', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => updateFlashcard.run({body: JSON.stringify({_id: flashcard._id, ...updateInput})}))
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Flashcard updated');
                })
        });
        it('update flashcard successfully status 200', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => updateFlashcard.run({body: JSON.stringify({_id: flashcard._id, ...updateInput})}))
                .then((response) => expect(response.statusCode).to.equal(200))
        });
        it('update flashcard with non existing _id', () => {
            return updateFlashcard.run({body: JSON.stringify({_id: '5d6d75be9ac0e43204da7c11', ...updateInput})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Flashcard with _id: 5d6d75be9ac0e43204da7c11 does not exist');
                })
        });
        it('update flashcard with non existing _id status code 404', () => {
            return updateFlashcard.run({body: JSON.stringify({_id: '5d6d75be9ac0e43204da7c11', ...updateInput})})
                .then((response) => expect(response.statusCode).to.equal(404))
        });
        it('update flashcard with missing _id key', () => {
            return updateFlashcard.run({body: JSON.stringify({...updateInput})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Input should contain _id');
                })
        });
        it('update flashcard with missing _id key status code 422', () => {
            return updateFlashcard.run({body: JSON.stringify({...updateInput})})
                .then((response) => expect(response.statusCode).to.equal(422));
        });
        it('update flashcard with missing _id value', () => {
            return updateFlashcard.run({body: JSON.stringify({_id: '', ...updateInput})})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Empty field: _id');
                })
        });
        it('update flashcard with missing _id value status code 422', () => {
            return updateFlashcard.run({body: JSON.stringify({_id: '', ...updateInput})})
                .then((response) => expect(response.statusCode).to.equal(422));
        });
    });

    context('get by flashcard', () => {
        before((done) => {
            done();
        });
        it('get by _id flashcard successfully', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => getByFlashcards.run({queryStringParameters: {_id: flashcard._id}}))
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Query result');
                    expect(body.flashcard).to.not.be.empty;
                })
        });
        it('get by _id flashcard successfully status 200', () => {
            return getAllFlashcards.run({})
                .then(response => {
                    const body = JSON.parse(response.body);
                    return body.flashcard[0];
                })
                .then(flashcard => getByFlashcards.run({queryStringParameters: {_id: flashcard._id}}))
                .then((response) => expect(response.statusCode).to.equal(200))
        });
        it('get by non existing _id flashcard successfully', () => {
            return getByFlashcards.run({queryStringParameters: {_id: '5d6d75be9ac0e43204da7c99'}})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('No flashcards were found');
                })
        });
        it('get by non existing _id flashcard successfully status 200', () => {
            return getByFlashcards.run({queryStringParameters: {_id: '5d6d75be9ac0e43204da7c99'}})
                .then((response) => expect(response.statusCode).to.equal(404))
        });
        it('get by name flashcards successfully', () => {
            return getByFlashcards.run({queryStringParameters: {name: 'savedfromtest'}})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Query result');
                    expect(body.flashcard).to.not.be.empty;
                })
        });
        it('get by name flashcards successfully status 200', () => {
            return getByFlashcards.run({queryStringParameters: {name: 'savedfromtest'}})
                .then((response) => expect(response.statusCode).to.equal(200))
        });
        it('get by author flashcard successfully', () => {
            return getByFlashcards.run({queryStringParameters: {author: 'integrationtests'}})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Query result');
                    expect(body.flashcard).to.not.be.empty;
                })
        });
        it('get by author flashcard successfully status 200', () => {
            return getByFlashcards.run({queryStringParameters: {author: 'integrationtests'}})
                .then((response) => expect(response.statusCode).to.equal(200))
        });

        it('get by empty query string param', () => {
            return getByFlashcards.run({})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('Missing query string parameter');
                })
        });
        it('get by empty query string param status code 422', () => {
            return getByFlashcards.run({})
                .then((response) => expect(response.statusCode).to.equal(422))
        });
        it('get by 2 query string params', () => {
            return getByFlashcards.run({queryStringParameters: {name: 'test', author: 'test'}})
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.include('You can pass only 1 query string parameter');
                })
        });
        it('get by 2 query string params 422', () => {
            return getByFlashcards.run({queryStringParameters: {name: 'test', author: 'test'}})
                .then((response) => expect(response.statusCode).to.equal(422))
        })
    });
});



