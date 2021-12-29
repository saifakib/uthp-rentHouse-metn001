const router = require('express').Router()

const {
    myProfileController,
    changeImageController,
    updateProfileController
} = require('../../controller/hwController/dashboard')

const { changePasswordController, changePasswordPostController } = require('../../controller/authController')

const changePasswordValidator = require('../../validator/auth/changePasswordValidator')
const profileValidation = require('../../validator/profileValidation')
const profileAvatarUpload = require('../../middleware/profileAvatarUpload')

router.get('/', myProfileController)
router.post('/update', profileValidation, updateProfileController)
router.post('/imageChange', profileAvatarUpload, changeImageController)
router.get('/password-change', changePasswordController)
router.post('/password-change', changePasswordValidator, changePasswordPostController)

module.exports = router