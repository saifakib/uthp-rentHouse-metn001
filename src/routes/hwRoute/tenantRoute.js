const router = require('express').Router()

const { tenantCreateGetController,
    tenantCreatePostController,
    tenantListController,
    tenantUpdatePageController,
    tenantUpdateController,
    removeController } = require('../../controller/hwController/tenantController')

const tenantValidator = require('../../validator/tenantValidation')
    
router.get('/list', tenantListController)
router.get('/create', tenantCreateGetController)
router.post('/create', tenantValidator, tenantCreatePostController)
router.get('/edit', tenantUpdatePageController)
router.post('/edit', tenantUpdateController)
router.get('/delete', removeController)

module.exports = router