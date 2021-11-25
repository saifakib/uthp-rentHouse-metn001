const router = require('express').Router()

const { categoryCreateGetController, categoryCreatePostController, categoryListController } = require('../../controller/adminController/category')

router.get('/list', categoryListController)
router.get('/create', categoryCreateGetController)
router.post('/create', categoryCreatePostController)

module.exports = router