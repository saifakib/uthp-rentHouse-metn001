/**
 * Route /hw/
 */

const router = require('express').Router()



const dashboardRoute = require('./dashboardRoute')

// Service Route
router.use('/dashboard', dashboardRoute)

module.exports = router