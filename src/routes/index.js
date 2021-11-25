const router = require('express').Router()
const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')
const hwRoute = require('./hwRoute')
const { homeController } = require('../controller/publicController')

const { requireRole, authToRedirect } = require('../middleware/auth')


router.use('/auth', authRoute)
router.get('/dashboard', authToRedirect)
router.use('/admin', [requireRole(['admin'])], adminRoute)
router.use('/hw',[requireRole(['hw'])], hwRoute)

router.get('/', homeController)

module.exports = router;