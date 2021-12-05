const router = require('express').Router()

const { homeOwnerGetController } = require('../../controller/adminController/homeOwner')

router.get('/list', homeOwnerGetController)
// router.get('/edit/:id', homeOwnerEditGetController)
// router.post('/edit/:id', homeOwnerEditPUTController)

module.exports = router