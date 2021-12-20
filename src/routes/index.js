const router = require('express').Router()
const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')
const hwRoute = require('./hwRoute')
const { homeController, contactGetController, propertyListing, searchPropertyListing, profile,
    profileProperty, singleGetPropertyController } = require('../controller/publicController')

const { requireRole, authToRedirect } = require('../middleware/auth')


router.use('/auth', authRoute)
router.get('/dashboard', authToRedirect)
router.use('/admin', [requireRole(['admin'])], adminRoute)
router.use('/hw',[requireRole(['hw'])], hwRoute)

router.get('/', homeController)
router.get('/profile', profile)
router.get('/profile/property', profileProperty)

router.get('/contact', contactGetController)
router.get('/property-listing', propertyListing)
router.get('/search-property-listing', searchPropertyListing)
router.get('/:location/:area/:post_id/details', singleGetPropertyController)

module.exports = router;