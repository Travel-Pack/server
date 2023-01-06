const { User, TravelStep, TravelStep_Destination, Destination, Hotel, sequelize } = require("../models")
const { Op } = require("sequelize");

class TravelStepController {

  static async createAndReadTravelStep(req, res, next) {
    try {
      const { budget, CityId, DestinationId, destinationPercentage, totalDestination } = req.body
      const UserId = req.user.id

      // auto Create TravelStep ketika tombol Generate di klik
      const newTravelStep = await TravelStep.create({ budget, destinationPercentage, UserId })

      let destination_budget = budget * (destinationPercentage / 100)
      const hotel_budget = +budget - (destination_budget)

      // langsung Generate rekomendasi travel Step
      let destinations = []
      let DB_destinations
      if (DestinationId) {
        let tot = totalDestination - 1
        DB_destinations = await Destination.findAll({ where: { CityId: CityId }, order: [['cost', "DESC"]] })
        const found = DB_destinations.find((el, i) => el.id == DestinationId);
        if (found) destinations.push(found)
        for (let i = 0; i < tot; i++) {
          if (DB_destinations[i].id != DestinationId && DB_destinations[i].cost <= destination_budget) {
            destinations.push(DB_destinations[i])
            destination_budget -= DB_destinations[i].cost
            // console.log(DB_destinations[i].id, "<-1->", DestinationId, "with index: ", i, " totaldestination: ", totalDestination);
          } else if (DB_destinations[i].id == DestinationId) {
            destinations.push(DB_destinations[i + 1])
            i++
            tot += 1
            // console.log(DB_destinations[i].id, "<-2->", DestinationId, "with index: ", i, " totaldestination: ", totalDestination);
          }
        }
      } else {
        destinations = await Destination.findAll({ where: { CityId: CityId }, order: [['cost', "DESC"]], limit: totalDestination })
      }
      const sisaBudget = destination_budget

      const hotels = await Hotel.findAll({ where: { CityId: CityId, price: { [Op.lte]: hotel_budget + sisaBudget } }, limit: totalDestination })

      res.status(200).json({ message: "TravelStep Added", TravelStep: { destinations, hotels }, planId: newTravelStep.id })
    } catch (error) {
      next(error)
    }
  }

  /*------ My Travel Steps (saved travelSteps) Section------ */
  static async createMyTravelStep(req, res, next) {
    try {
      const { DestinationId, HotelId } = req.body
      const { planId } = req.params

      await TravelStep_Destination.create({ planId, DestinationId, HotelId })

      res.status(201).json("Ok - TravelStep plan Added")
    } catch (error) {
      next(error)
    }
  }
  static async readMyTravelSteps(req, res, next) {
    try {
      const myTravelSteps = await TravelStep_Destination.findAll({
        include: [Hotel, Destination],
        order: [['createdAt', "DESC"]]
      })

      res.status(200).json({ myTravelSteps })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TravelStepController

