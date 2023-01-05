const router = require("express").Router();
const Controller = require("../controllers");
const destinationPath = require('./destinations');
const travelStepPath = require('./travelSteps');

const userRouter = require("./users")
const favouriteRouter = require("./favourites")
const provincesRouter = require("./provinces");
const reviewsRouter = require("./reviews");
const publicsRouter = require("./public")

const Authentication = require("../middlewares/Authentication")

// Register & Login
router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(publicsRouter)

router.use(Authentication.verify)

// User
router.use("/users", userRouter);

// Favourites
router.use("/favourites", favouriteRouter);

// Destinations
router.use("/destinations", destinationPath);

// TravelSteps / My TravelSteps
router.use("/travel-steps", travelStepPath)

router.use(provincesRouter); // Provinces
router.use(reviewsRouter); // Reviews

module.exports = router;
