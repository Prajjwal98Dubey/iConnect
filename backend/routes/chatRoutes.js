
const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers')

const router = express.Router()

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route('/group').post(protect,createGroupChat)
router.route('/group/rename').put(protect,renameGroup)
router.route('/group/add').put(protect,addToGroup)
router.route('/group/remove').put(protect,removeFromGroup)
module.exports = router