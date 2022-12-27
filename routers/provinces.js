const provincesRouter = require("express").Router();
const ProvinceController = require("../controllers/provinces")

provincesRouter.post("/provinces", ProvinceController.postProvince)
provincesRouter.put("/provinces/:id", ProvinceController.putProvince)

module.exports = provincesRouter