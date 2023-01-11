const CityController = require("../controllers/cities");
const router = require("express").Router();

router.get("/cities", CityController.getCities);
router.post("/cities", CityController.addCity);
router.get("/cities/:slug", CityController.getCityById);
router.put("/cities/:slug", CityController.editCity);

module.exports = router;
