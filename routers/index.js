const router = require("express").Router();
const Controller = require("../controllers");

const provincesRouter = require("./provinces");
const reviewRouter = require("./reviews");

// Register & Login
router.post("/register", Controller.register);
router.post("/login", Controller.login);

// User
router.get("/users/:id", Controller.userById);
// router.put("/users/:id", Controller.);
// router.patch("/users/:id", Controller.);

router.use(provincesRouter); // Provinces
router.use(reviewRouter); // Reviews

module.exports = router;