const router = require("express").Router();
const DestinationController = require("../controllers/destinations");
const ProvinceController = require("../controllers/provinces")
const ReviewController = require("../controllers/reviews")

/* -------- Provinces --------- */
router.get("/provinces", ProvinceController.getProvinces)
router.get("/reviews/:DestinationId", ReviewController.getReviewByDestination)

/* -------- Destinations --------- */
router.get('/destinations', DestinationController.readAllDestination)
router.get('/destinations/:slug', DestinationController.readOneDestination)

module.exports = router