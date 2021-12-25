const router = require('express').Router()

const {
    dashboardController,
    getAllPropertyController,
    changePasswordController,
    changePasswordPostController
} = require('../../controller/adminController/dashboard')
const changePasswordValidator = require('../../validator/auth/changePasswordValidator')

router.get('/', dashboardController)
router.get('/list', getAllPropertyController)
router.get('/password-change', changePasswordController)
router.post('/password-change', changePasswordValidator, changePasswordPostController)

module.exports = router