const router = require('express').Router()

const {
    dashboardController,
    myProfileController,
    updateProfileController,
    getAllPropertyController,
    changePasswordController,
    changePasswordPostController
} = require('../../controller/adminController/dashboard')
const changePasswordValidator = require('../../validator/auth/changePasswordValidator')
const profileValidation = require('../../validator/profileValidation')

router.get('/', dashboardController)
router.get('/my', myProfileController)
router.post('/update', profileValidation, updateProfileController)
router.get('/list', getAllPropertyController)
router.get('/password-change', changePasswordController)
router.post('/password-change', changePasswordValidator, changePasswordPostController)

module.exports = router