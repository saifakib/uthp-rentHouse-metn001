/**
 * Route /auth/
 */

const router = require('express').Router()
const {
    registerGetController,
    registerPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controller/authController')

const { isAuthenticated, isUnauthenticated } = require('../middleware/auth')

const registerValidator = require('../validator/auth/registerValidator')
const loginValidator = require('../validator/auth/loginValidator')


router.get('/register', isUnauthenticated, registerGetController)

router.get('/login', isUnauthenticated, loginGetController)

router.post('/register', registerValidator, registerPostController)

router.post('/login', loginValidator, loginPostController)

router.get('/logout', isAuthenticated, logoutController);


module.exports = router