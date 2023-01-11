const router = require('express').Router();
const UserController = require('../controllers/users');


router.get("/", UserController.userById);
router.put("/", UserController.updateUser);
router.patch("/activatePremium", UserController.activatePremiumStatus);
router.patch("/deactivatePremium", UserController.deactivatePremiumStatus);
router.patch("/incrimentPoint", UserController.incrimentPointUser);

module.exports = router;
