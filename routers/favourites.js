const router = require('express').Router();
const FavouriteController = require('../controllers/favourites')


router.get("/", FavouriteController.readFavourites);
router.post("/", FavouriteController.addFavourites);

module.exports = router;
