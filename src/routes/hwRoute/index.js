/**
 * Route /hw/
 */

const router = require('express').Router()



const dashboardRoute = require('./dashboardRoute')
const propertyRoute = require('./propertyRoute')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/profile', dashboardRoute)
router.use('/property', propertyRoute)

module.exports = router