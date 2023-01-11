const router = require('express').Router()
const TopicController = require('../controllers/topic')

router.post('/', TopicController.postTopic)
router.get('/', TopicController.getAllTopics)
router.get('/:id', TopicController.getTopic)

module.exports = router