const router = require('express').Router()

const { areaListController, areaCreateGetController, areaCreatePostController } = require('../../controller/adminController/locationAndArea')

router.get('/list', areaListController)
router.get('/create', areaCreateGetController)
router.post('/create', areaCreatePostController)

module.exports = router