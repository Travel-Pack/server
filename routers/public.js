const publicsRouter = require("express").Router();
const ProvinceController = require("../controllers/provinces")
const ReviewController = require("../controllers/reviews")

publicsRouter.get("/public/categories", ProvinceController.getProvinces)
publicsRouter.get("/publics/", ReviewController.getReviewByDestination)

module.exports = publicsRouter