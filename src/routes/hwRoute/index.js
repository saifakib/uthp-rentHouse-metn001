/**
 * Route /hw/
 */

const router = require('express').Router()



const dashboardRoute = require('./dashboardRoute')
const propertyRoute = require('./propertyRoute')
const tenantRoute = require('./tenantRoute')
const paymentRoute = require('./paymentRoute')
const profileRoute = require('./profileRoute')


const { changeStatus } = require('../../controller/statusChangeController')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/profile', profileRoute)
router.use('/property', propertyRoute)
router.use('/tenant', tenantRoute)
router.use('/payment', paymentRoute)

router.get('/status', changeStatus)


module.exports = router