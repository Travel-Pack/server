const router = require("express").Router();
const CityController = require("../controllers/cities");
const DestinationController = require("../controllers/destinations");
const HotelController = require("../controllers/hotels");
const ProvinceController = require("../controllers/provinces");
const ReviewController = require("../controllers/reviews");
const TopicController = require("../controllers/topic")

/* -------- Provinces --------- */
router.get("/provinces", ProvinceController.getProvinces);

/* -------- Cities --------- */
router.get("/cities", CityController.getCities);
router.get("/cities/:slug", CityController.getCityById);

/* -------- Destinations --------- */
router.get('/destinations', DestinationController.readAllDestination)
router.get('/destinations/best', DestinationController.readBestDestination)
router.get('/destinations/:slug', DestinationController.readOneDestination)

/* -------- Hotels --------- */
router.get("/hotels", HotelController.readAllHotels);
router.get("/hotels/:slug", HotelController.readOneHotel);

/* -------- Reviews --------- */
router.get("/reviews", ReviewController.getReviews);
router.get(
  "/reviews/d/:DestinationId",
  ReviewController.getReviewByDestination
);
router.get("/reviews/h/:HotelId", ReviewController.getReviewByHotel);

/* -------- Topic/Forum --------- */
router.get('/topic', TopicController.getAllTopics)
router.get('/topic/:id', TopicController.getTopic)

module.exports = router;
