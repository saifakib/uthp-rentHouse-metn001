const router = require('express').Router()

const { paymentCreateGetController,
    paymentCreatePostController,
    paymentListController } = require('../../controller/hwController/paymentController')

router.get('/list', paymentListController)
router.get('/create', paymentCreateGetController)
router.post('/create', paymentCreatePostController)

module.exports = router