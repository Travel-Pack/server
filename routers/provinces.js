const provincesRouter = require("express").Router();
const ProvinceController = require("../controllers/provinces")
const Authorization = require("../middlewares/Authorization")

provincesRouter.post("/provinces", Authorization.adminClearance, ProvinceController.postProvince)
provincesRouter.put("/provinces/:id", Authorization.adminClearance, ProvinceController.putProvince)

module.exports = provincesRouter