const router = require('express').Router()

const { propertyCreateGetController,
    propertyCreatePostController,
    propertyListController,
    changeStatusController,
    propertyUpdatePageController,
    propertyUpdateController } = require('../../controller/hwController/propertyController')
const propertyValidator = require('../../validator/propertyValidator')
const avatarUpload = require('../../middleware/avatarUpload')
router.get('/list', propertyListController)
router.get('/create', propertyCreateGetController)
router.post('/create', avatarUpload, propertyCreatePostController)
router.get('/edit', propertyUpdatePageController)
router.post('/edit', propertyUpdateController)
router.get('/status', changeStatusController)

module.exports = router