const router = require('express').Router()
const TopicController = require('../controllers/topic')

router.post('/topic/', TopicController.postTopic)
router.get('/topic/:id', TopicController.getTopic)

module.exports = router