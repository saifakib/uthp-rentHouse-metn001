const router = require('express').Router()

const { dashboardController } = require('../../controller/adminController/dashboard')

router.get('/', dashboardController)

module.exports = router