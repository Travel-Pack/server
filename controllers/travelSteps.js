const { Destination, User, TravelStep, Favourite, sequelize, Hotel, City } = require("../models")
const { Op } = require("sequelize");

class TravelStepsController {
  static async createTravelStep(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {HotelId, name, DestinationIds} = req.body;
      const travelStep = await TravelStep.create(
        {
          UserId: req.user.id,
          HotelId,
          name
        },
        { transaction: t }
      )
      const favourites = DestinationIds.map((el) => {
        return {
          DestinationId: el.id,
          UseTravelStepId: travelStep.id
        };
      });
      await Favourite.bulkCreate(favourites, { transaction: t });
      await t.commit();
      res.status(201).json(travelStep);
    } catch (error) {
      await t.rollback();
      next(error)
    }
  }
  static async readAllTravelStep(req, res, next) {
    try {
      const travelSteps = await TravelStep.findAll({
        where: {
          UserId: req.user.id
        },
        include: {
          model: Favourite,
          include: Destination
        }
      })
      res.status(200).json(travelSteps);
    } catch (error) {
      next(error)
    }
  }
  static async generateTravelStep(req, res, next) {
    try {
      let { budgetDestination, budgetHotel, CityId, DestinationIds, numberOfDestination } = req.body;
      if(DestinationIds.length > numberOfDestination){
        throw({name: "numberOfDestinationMinus"})
      }
      const hotels = await Hotel.findAll({
        where: {
          CityId,
          price: { [Op.lte]: budgetHotel }
        }
      })
      budgetDestination = budgetDestination / numberOfDestination;
      const destinations = await Destination.findAll({
        where: {
          CityId,
          cost: { [Op.lte]: budgetDestination }
        }
      })
      if (!hotels.length) {
        throw ({ name: "notMatchHotel" });
      }
      if (destinations.length < numberOfDestination) {
        throw ({ name: "notMatchDestination" });
      }
      const travelStep = [];
      const destinationCombinations = TravelStepsController.combinationGenerator(destinations, numberOfDestination);
      for (let hotel of hotels) {
        for (let destinationCombination of destinationCombinations) {
          let criteria = true;
          if (DestinationIds.length) {
            const exist = DestinationIds.every(el => destinationCombination.map(el => el.id).includes(el));
            if (!exist) {
              criteria = false;
            }
          }
          if (criteria) {
            travelStep.push({ hotel, destination: destinationCombination });
          }
        }
      }
      if (!travelStep.length) {
        throw ({ name: "notMatchDestination" });
      }
      const sortedTravelStep = TravelStepsController.sortTravelStep(travelStep).slice(0,10);
      res.status(200).json({ travelStep: sortedTravelStep });
    } catch (error) {
      next(error);
    }
  }
  static combinationGenerator(destination, numberOfDestination) {
    const travelStep = [];
    let combined = [];
    function combinationUtil(arr, n, r, index, data, i) {
      if (index == r) {
        for (let j = 0; j < r; j++) {
          combined.push(data[j]);
        }
        if (combined.length === r) {
          travelStep.push(combined);
          combined = [];
        }
        return;
      }
      if (i >= n) {
        return;
      }
      data[index] = arr[i];
      combinationUtil(arr, n, r, index + 1, data, i + 1);
      combinationUtil(arr, n, r, index, data, i + 1);
    }
    function printCombination(arr, n, r) {
      let data = new Array(r);
      combinationUtil(arr, n, r, 0, data, 0);
    }
    printCombination(destination, destination.length, numberOfDestination);
    return travelStep;
  }
  static sortTravelStep(travelStep){
    return travelStep.sort((a, b) => (a.hotel.price + a.destination.reduce((accumulator, currentValue) => {
      if (typeof accumulator !== "number") {
        accumulator = accumulator.cost;
      }
      return accumulator + currentValue.cost
    })) -
      (b.hotel.price + b.destination.reduce((accumulator, currentValue) => {
        if (typeof accumulator !== "number") {
          accumulator = accumulator.cost;
        }
        return accumulator + currentValue.cost
      }))
    );
  }
}

module.exports = TravelStepsController

