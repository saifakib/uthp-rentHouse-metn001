const router = require('express').Router()

const { paymentGetController } = require('../../controller/adminController/dashboard')

router.get('/list', paymentGetController)

module.exports = router