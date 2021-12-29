const router = require('express').Router()

const {
    myProfileController,
    updateProfileController
} = require('../../controller/adminController/dashboard')

const { changePasswordController, changePasswordPostController } = require('../../controller/authController')

const changePasswordValidator = require('../../validator/auth/changePasswordValidator')
const profileValidation = require('../../validator/profileValidation')

router.get('/', myProfileController)
router.post('/update', profileValidation, updateProfileController)
router.get('/password-change', changePasswordController)
router.post('/password-change', changePasswordValidator, changePasswordPostController)

module.exports = router