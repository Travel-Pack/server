const router = require("express").Router();
const Controller = require("../controllers");

// Register & Login
router.post("/register", Controller.register);
router.post("/login", Controller.login);

// User
router.get("/users/:id", Controller.userById);
// router.put("/users/:id", Controller.);
// router.patch("/users/:id", Controller.);

module.exports = router;
