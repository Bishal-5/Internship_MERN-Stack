const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);

    // Log the exception details
    res
        .status(500)
        .send({
            message: 'Something Failed!',
            error: err.message
        });
}