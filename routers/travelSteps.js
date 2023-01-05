const TravelStepController = require('../controllers/travelSteps')

const router = require('express').Router()

router.post('/', (req, res) => {
  res.status(200).json("MASUKK!")
})
// router.post('/', TravelStepController.createAndReadTravelStep)
// router.get('/', DestinationController.readAllDestination)


module.exports = router
