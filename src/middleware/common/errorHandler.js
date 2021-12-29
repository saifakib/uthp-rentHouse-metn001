const createError = require('http-errors')

// 404 not found error handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your request content was not found"))
}


// Default error handler
const errorHandler = (error, req, res, next) => {
    if (error.status == 404) {
        res.render('error/404.ejs', { title: `${error.status} Page Not Found` })
    } else {
        if (error.status && error.message) {
            res.render('error/responseErrorPage.ejs', { title: `${error.status}  ${error.message}` })
        }
        else if (error.status) {
            res.render('error/responseErrorPage.ejs', { title: `${error.status} Internal  Server Error` })
        }
        else if (error.message) {
            res.render('error/responseErrorPage.ejs', { title: `${error.message}` })
        }
        else {
            res.render('error/responseErrorPage.ejs', { title: `Internal  Server Error` })
        }
    }
}


module.exports = {
    notFoundHandler,
    errorHandler
}