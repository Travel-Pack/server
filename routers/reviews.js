const reviewsRouter = require("express").Router();
const ReviewController = require("../controllers/reviews");
const Authorization = require("../middlewares/Authorization");

reviewsRouter.post("/reviews", ReviewController.postReview);
reviewsRouter.put(
  "/reviews/:id",
  Authorization.reviewClearance,
  ReviewController.putReview
);
reviewsRouter.delete(
  "/reviews/:id",
  Authorization.reviewClearance,
  ReviewController.delReview
);
reviewsRouter.get("/reviews", ReviewController.getReviews);

module.exports = reviewsRouter;
