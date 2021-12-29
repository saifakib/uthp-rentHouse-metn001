const createError = require('http-errors')
const { User } = require('../models')


const bindUserWithRequest = () => {
    return async (req, res, next) => {

        if (!req.session.isloggedIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()

        } catch (err) {
            console.log(err)
            next(createError(501, err.message))
        }
    }
}


const isAuthenticated = (req, res, next) => {
    if (!req.session.isloggedIn) {
        return res.redirect('/auth/login')
    }
    next()
}


const isUnauthenticated = (req, res, next) => {
    if (req.session.isloggedIn) {
        return res.redirect('/dashboard')
    }
    next()
}


const requireRole = (roles) => {
    return function (req, res, next) {
        if (req.session.isloggedIn) {
            if (req.user.role && roles.includes(req.user.role)) {
                next()
            } else {
                next(createError(401, "You are not authorized!"))
            }
        } else {
            next(createError(401, "You are not authorized!"))
        }

    }
}


const authToRedirect = (req, res, next) => {
    return req.session.isloggedIn ?
        res.locals.user.role == 'admin' ?
            res.redirect('admin/dashboard') : res.redirect('hw/dashboard') : res.redirect('/auth/login')
}

module.exports = {
    bindUserWithRequest,
    isAuthenticated,
    isUnauthenticated,
    requireRole,
    authToRedirect
}