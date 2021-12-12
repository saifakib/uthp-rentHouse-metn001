const router = require('express').Router()

const { categoryCreateGetController, categoryCreatePostController, categoryListController, categoryUpdatePageController, categoryUpdateController } = require('../../controller/adminController/category')
const categoryValidator = require('../../validator/categoryValidator')

router.get('/list', categoryListController)
router.get('/create', categoryCreateGetController)
router.post('/create', categoryValidator, categoryCreatePostController)
router.get('/edit', categoryUpdatePageController)
router.post('/edit', categoryUpdateController)

module.exports = router