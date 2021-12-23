/**
 * Route /hw/
 */

const router = require('express').Router()



const dashboardRoute = require('./dashboardRoute')
const propertyRoute = require('./propertyRoute')
const tenantRoute = require('./tenantRoute')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/profile', dashboardRoute)
router.use('/property', propertyRoute)
router.use('/tenant', tenantRoute)
module.exports = router