const router = require('express').Router()

const {
    dashboardController,
    myProfileController,
    changeImageController,
    updateProfileController,
    changePasswordController,
    changePasswordPostController } = require('../../controller/hwController/dashboard')

const changePasswordValidator = require('../../validator/auth/changePasswordValidator')
const profileValidation = require('../../validator/profileValidation')
const profileAvatarUpload = require('../../middleware/profileAvatarUpload')

router.get('/', dashboardController)
router.get('/my', myProfileController)
router.post('/update', profileValidation, updateProfileController)
router.post('/imageChange', profileAvatarUpload, changeImageController)
router.get('/password-change', changePasswordController)
router.post('/password-change', changePasswordValidator, changePasswordPostController)

module.exports = router