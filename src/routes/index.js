const router = require('express').Router()
const { homeController } = require('../controller/publicController')

router.get('/', homeController)

module.exports = router;