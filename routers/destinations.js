const DestinationController = require('../controllers/destinations')

const router = require('express').Router()

router.post('/', DestinationController.createDestination)
router.get('/', DestinationController.readAllDestination)
router.put('/:id', DestinationController.updateDestination)
router.delete('/:id', DestinationController.deleteDestination)

module.exports = router
