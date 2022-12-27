const reviewRouter = require("express").Router();
const ReviewController = require("../controllers/reviews")
const Authorization = require("../middlewares/Authorization")

reviewRouter.post("/reviews", ReviewController.postReview)
reviewRouter.put("/reviews/:id", Authorization.reviewClearance, ReviewController.putReview)
reviewRouter.delete("/reviews/:id", Authorization.reviewClearance, ReviewController.delReview)

module.exports = reviewRouter