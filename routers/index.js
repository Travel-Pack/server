const router = require("express").Router();
const Controller = require("../controllers");
const destinationPath = require('./destinations');

// Register & Login
router.post("/register", Controller.register);
router.post("/login", Controller.login);

// User
router.get("/users/:id", Controller.userById);
// router.put("/users/:id", Controller.);
// router.patch("/users/:id", Controller.);

// Destinations
router.use("/destinations", destinationPath);

module.exports = router;
