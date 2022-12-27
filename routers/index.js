const router = require("express").Router();
const Controller = require("../controllers");

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
router.get("/users/:id", Controller.userById);
// router.put("/users/:id", Controller.);
// router.patch("/users/:id", Controller.);

router.use(provincesRouter); // Provinces
router.use(reviewsRouter); // Reviews

module.exports = router;