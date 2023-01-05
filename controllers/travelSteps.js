const { User, TravelStep, TravelStep_Destination, Destination, Hotel, sequelize } = require("../models")
const { Op } = require("sequelize");

class TravelStepController {

  // static async createTravelStep(req, res, next) {
  //   try {
  //     const { budget, destinationPercentage } = req.body
  //     const UserId = 5 // req.user.id

  //     const newTravelStep = await Destination.create({ budget, destinationPercentage, UserId })

  //     res.status(201).json("Ok - TravelStep Added")
  //   } catch (error) {

  //   }
  // }
  // static async readAllTravelStep(req, res, next) {
  //   try {
  //     const { name, address, mainImg, cost, geocoding, CityId } = req.body
  //     const destination = await Destination.findAll({
  //       include: [
  //         { model: Review },
  //         Image
  //       ]
  //     })

  //     res.status(200).json(destination)
  //   } catch (error) {
  //     console.log(error);
  //     // next(error)
  //   }
  // }
  static async createAndReadTravelStep(req, res, next) {
    try {
      const { budget, CityId, DestinationId, destinationPercentage, totalDestination } = req.body
      const UserId = 5
      // const UserId = req.user.id
      console.log("SEBELUM CREATE");
      // auto Create TravelStep ketika tombol Generate di klik
      const newTravelStep = await TravelStep.create({ budget, destinationPercentage, UserId })
      console.log("++ SESUDAH CREATE ++");

      const destination_budget = (budget * (destinationPercentage / 100)) / totalDestination
      const hotel_budget = budget - (budget * (destinationPercentage / 100))

      // langsung Genereta rekomendasi travel Step
      let destination
      if (DestinationId) {
        --totalDestination
      }
      destination = await Destination.findAll({ where: { CityId: CityId, cost: { [Op.lte]: destination_budget, }, order: [['title', "DESC"]], limit: totalDestination } })
      const found = destination.find(el => el.id == DestinationId);
      // if (found) 
      console.log(found, "<---- ini found");
      // const hotel = await Hotel.findAll({ where: { CityId: CityId, price: { [Op.lte]: hotel_budget }, limit: totalDestination } })



      res.status(200).json({ message: "TravelStep Added", TravelStep: { destination }, planId: newTravelStep.id })
      // res.status(200).json({ message: "TravelStep Added", TravelStep: { destination, hotel }, planId: newTravelStep.id })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TravelStepController

