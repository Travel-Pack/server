const publicsRouter = require("express").Router();
const ProvinceController = require("../controllers/provinces")
const ReviewController = require("../controllers/reviews")

publicsRouter.get("/publics/provinces", ProvinceController.getProvinces)
publicsRouter.get("/publics/reviews/:DestinationId", ReviewController.getReviewByDestination)

module.exports = publicsRouter