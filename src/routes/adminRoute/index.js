/**
 * Route /admin/
 */

const router = require('express').Router()


const dashboardRoute = require('./dashboardRoute')
const locationRoute = require('./locationRoute')
const areaRoute = require('./areaRoute')
const categoryRoute = require('./categoryRoute')
const hwRoute = require('./homeOwnerRoute')
const tenantRoute = require('./tenantRoute')
const profileRoute = require('./profileRoute')

const { changeStatus } = require('../../controller/statusChangeController')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/property', dashboardRoute)
router.use('/profile', profileRoute)
router.use('/location', locationRoute)
router.use('/area', areaRoute)
router.use('/category', categoryRoute)
router.use('/homeowner', hwRoute)
router.use('/tenant', tenantRoute)

router.get('/status', changeStatus)

module.exports = router