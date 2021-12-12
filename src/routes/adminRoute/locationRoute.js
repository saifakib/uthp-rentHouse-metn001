const router = require('express').Router()

const { locationListController, locationCreateGetController, locationCreatePostController, locationUpdatePageController, locationUpdateController } = require('../../controller/adminController/locationAndArea')
const districtValidator = require('../../validator/districtValidator')

router.get('/list', locationListController)
router.get('/create', locationCreateGetController)
router.post('/create', districtValidator, locationCreatePostController)
router.get('/edit', locationUpdatePageController)
router.post('/edit', locationUpdateController)

module.exports = router