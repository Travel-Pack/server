const HotelController = require('../controllers/hotels')

const router = require('express').Router()

// router.post('/', HotelController.createDestination)
router.get('/', HotelController.readAllHotels)
router.get('/:slug', HotelController.readOneHotel)
// router.put('/:id', DestinationController.updateDestination)
// router.delete('/:id', DestinationController.deleteDestination)

module.exports = router
