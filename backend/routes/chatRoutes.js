
const express = require('express')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// router.route('/').post(protect,accessChat)

module.export = router