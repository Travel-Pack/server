const DestinationController = require('../controllers/destinations')

const router = require('express').Router()

router.post('/', DestinationController.createDestination)
router.get('/', DestinationController.readAllDestination)
router.get('/:slug', DestinationController.readOneDestination)

module.exports = router
