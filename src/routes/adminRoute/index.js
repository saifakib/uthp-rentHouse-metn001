/**
 * Route /admin/
 */

const router = require('express').Router()



const dashboardRoute = require('./dashboardRoute')
const locationRoute = require('./locationRoute')
const areaRoute = require('./areaRoute')
const categoryRoute = require('./categoryRoute')
const hwRoute = require('./homeOwnerRoute')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/location', locationRoute)
router.use('/area', areaRoute)
router.use('/category', categoryRoute)
router.use('/homeowner', hwRoute)

module.exports = router