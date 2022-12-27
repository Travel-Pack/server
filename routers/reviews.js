const reviewRouter = require("express").Router();
const ReviewController = require("../controllers/reviews")

router.post("/reviews", ReviewController.postReview)
router.put("/reviews/:id", ReviewController.putReview)
router.delete("/reviews/:id", ReviewController.delReview)

module.exports = router