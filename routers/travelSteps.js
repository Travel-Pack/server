const TravelStepController = require('../controllers/travelSteps')

const router = require('express').Router()

// router.post('/', (req, res) => {
//   res.status(200).json("MASUKK!")
// })
router.post('/', TravelStepController.createAndReadTravelStep) // Create & Generate (plan)
router.post('/:planId', TravelStepController.createMyTravelStep) // Create (saved) 1 travel step into My Travel Steps
router.get('/', TravelStepController.readMyTravelSteps) // READ ALL (plan) My Travel Steps


module.exports = router
