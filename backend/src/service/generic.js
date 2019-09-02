const response = (status, body) => {
    return {
        statusCode: status,
        body: JSON.stringify(body)
    }
};
module.exports = {
    response
};