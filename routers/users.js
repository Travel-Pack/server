const router = require('express').Router();
const UserController = require('../controllers/users')


router.get("/:id", UserController.userById);
router.put("/:id", UserController.updateUser);
router.patch("/:id", UserController.updatePremiumStatus);

module.exports = router;
