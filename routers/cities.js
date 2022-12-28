const CityController = require("../controllers/cities");
const router = require("express").Router();

router.get("/cities", CityController.getCities);
router.post("/cities", CityController.addCity);
router.get("/cities/:id", CityController.getCityById);
router.put("/cities/:id", CityController.editCity);

module.exports = router;
