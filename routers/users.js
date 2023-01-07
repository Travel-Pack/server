const router = require('express').Router();
const UserController = require('../controllers/users');
const Authorization = require('../middlewares/Authorization');


router.get("/:id", Authorization.adminClearance, UserController.userById);
router.put("/:id", Authorization.adminClearance, UserController.updateUser);
router.patch("/activatePremium/:id", Authorization.adminClearance, UserController.activatePremiumStatus);
router.patch("/deactivatePremium/:id", Authorization.adminClearance, UserController.deactivatePremiumStatus);
router.patch("/incrimentPoint/:id", Authorization.adminClearance, UserController.incrimentPointUser);

module.exports = router;
