const router = require('express').Router()

const { tenantGetController } = require('../../controller/adminController/dashboard')

router.get('/list', tenantGetController)

module.exports = router