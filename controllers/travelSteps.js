const { Destination, User, TravelStep, Favourite, sequelize } = require("../models")

class TravelStepsController {
  static async createTravelStep(req, res, next) {
    try {
      const { UserId, HotelId } = req.body

    } catch (error) {
      next(error)
    }
  }
  static async readAllTravelStep(req, res, next) {
    try {
      const UserId = req.user.id

    } catch (error) {
      next(error)
    }
  }
}

module.exports = TravelStepsController

