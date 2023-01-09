const MidtransController = require('../controllers/midtrans');
const router = require('express').Router();

router.post('/', MidtransController.generateSnapToken);

module.exports = router;
