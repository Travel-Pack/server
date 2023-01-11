const TravelStepsController = require('../controllers/travelSteps')

const router = require('express').Router()

router.post('/', TravelStepsController.createTravelStep)
router.get('/', TravelStepsController.readAllTravelStep)
router.post('/generates', TravelStepsController.generateTravelStep)
// router.post('/generates/premiums', TravelStepsController.travelStepGeneratorPremium)

module.exports = router
