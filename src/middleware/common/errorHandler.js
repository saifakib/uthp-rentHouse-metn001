const createError = require('http-errors')

// 404 not found error handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your request content was not found"))
}

// Default error handler
const errorHandler = (error, req, res, next) => {

    res.status(error.status || 500)
    res.json({
        message: error.message
    })
}


module.exports = {
    notFoundHandler,
    errorHandler
}