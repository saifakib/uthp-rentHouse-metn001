const router = require('express').Router()
const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')
const hwRoute = require('./hwRoute')
const { homeController, contactGetController, propertyListing, searchPropertyListing, profile,
    profileProperty, singleGetPropertyController, areaPropertyListing, categoryPropertyListing,
    termsAndConditionController, privacyAndPolicyController, singleGetAreaController } = require('../controller/publicController')

const { requireRole, authToRedirect } = require('../middleware/auth')
const homeOwnerMiddleware = require('../middleware/homeOwner')


router.use('/auth', authRoute)
router.get('/dashboard', authToRedirect)
router.use('/admin', [requireRole(['admin'])], adminRoute)
router.use('/hw', [requireRole(['hw'])], homeOwnerMiddleware(), hwRoute)

router.get('/', homeController)
router.get('/profile', profile)
router.get('/profile/property', profileProperty)

router.get('/contact', contactGetController)
router.get('/property-listing', propertyListing)
router.get('/search-property-listing', searchPropertyListing)
router.get('/:location/:area/:id', areaPropertyListing)
router.get('/:category', categoryPropertyListing)
router.get('/:location/:area/:post_id/details', singleGetPropertyController)

router.get('/terms', termsAndConditionController)
router.get('/privacy-policy', privacyAndPolicyController)

router.get('/location/:id', singleGetAreaController)


module.exports = router;