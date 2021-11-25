const router = require('express').Router()

const { dashboardController } = require('../../controller/hwController/dashboard')

router.get('/', dashboardController)

module.exports = router