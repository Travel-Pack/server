const TravelStepsController = require('../controllers/travelSteps')

const router = require('express').Router()

router.post('/', TravelStepsController.createTravelStep)
router.get('/', TravelStepsController.readAllTravelStep)

module.exports = router
