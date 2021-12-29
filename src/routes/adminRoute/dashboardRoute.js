const router = require('express').Router()

const {
    dashboardController,
    getAllPropertyController
} = require('../../controller/adminController/dashboard')

router.get('/', dashboardController)
router.get('/list', getAllPropertyController)

module.exports = router