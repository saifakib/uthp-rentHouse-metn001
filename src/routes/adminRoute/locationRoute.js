const router = require('express').Router()

const { locationListController, locationCreateGetController, locationCreatePostController } = require('../../controller/adminController/locationAndArea')

router.get('/list', locationListController)
router.get('/create', locationCreateGetController)
router.post('/create', locationCreatePostController)

module.exports = router