const router = require("express").Router();
const Controller = require("../controllers");
const destinationPath = require("./destinations");
const hotelPath = require("./hotels");

const userRouter = require("./users");
const travelStepRouter = require('./travelSteps');
const provincesRouter = require("./provinces");
const reviewsRouter = require("./reviews");
const publicsRouter = require("./public");
const cityRouter = require("./cities");
const midtransRouter = require("./midtrans");
const topicRouter = require("./topic")
const Authentication = require("../middlewares/Authentication");

// Register & Login
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google", Controller.googleSignIn);

router.use("/publics", publicsRouter);
router.use(cityRouter); // City
router.use(Authentication.verify);

// User
router.use("/users", userRouter);

// TravelSteps
router.use("/travel-steps", travelStepRouter);

// Destinations
router.use("/destinations", destinationPath);

// Hotels
router.use("/hotels", hotelPath);

// Topic
router.use('/topic', topicRouter)

router.use(provincesRouter); // Provinces
router.use(reviewsRouter); // Reviews

// Midtrans
router.use("/midtrans", midtransRouter);

module.exports = router;
