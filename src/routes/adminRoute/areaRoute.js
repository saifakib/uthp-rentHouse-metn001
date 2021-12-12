const router = require('express').Router()

const { areaListController, areaCreateGetController, areaCreatePostController, areaUpdatePageController, areaUpdateController } = require('../../controller/adminController/locationAndArea')

router.get('/list', areaListController)
router.get('/create', areaCreateGetController)
router.post('/create', areaCreatePostController)
router.get('/edit', areaUpdatePageController)
router.post('/edit', areaUpdateController)

module.exports = router