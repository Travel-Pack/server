const router = require('express').Router();
const UserController = require('../controllers/users');
const Authorization = require('../middlewares/Authorization');


router.get("/:id", UserController.userById);
router.put("/:id", UserController.updateUser);
router.patch("/activatePremium/:id", Authorization.adminClearance, UserController.activatePremiumStatus);
router.patch("/deactivatePremium/:id", Authorization.adminClearance, UserController.deactivatePremiumStatus);

module.exports = router;
