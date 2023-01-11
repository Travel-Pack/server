const { Destination, User, TravelStep, Favourite, sequelize, Hotel, City } = require("../models")
const { Op } = require("sequelize");

class TravelStepsController {
  static async createTravelStep(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {HotelId, name, DestinationIds} = req.body;
      if(!HotelId || !name || !DestinationIds.length){
        throw({name: "travelDataStepEmpty"})
      }
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
      res.status(201).json({msg: "Successfully add travel step"});
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
        include: [{
          model: Favourite,
          include: Destination
        },
        Hotel
      ]
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
          price: { [Op.lte]: budgetHotel },
          id: { [Op.ne]: 1 }
        }
      })
      budgetDestination = budgetDestination / numberOfDestination;
      const destinations = await Destination.findAll({
        where: {
          CityId,
          cost: { [Op.lte]: budgetDestination },
          id: { [Op.ne]: 1 }
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
      const sortedTravelStep = TravelStepsController.sortTravelStep(travelStep);
      let data = {};
      console.log(sortedTravelStep.length > 4 && !req.user.isPremium);
      if(sortedTravelStep.length > 4 && !req.user.isPremium){
        data.travelStep = sortedTravelStep.slice(0, 4);
        data.needPremium = true;
      }
      else{
        data.travelStep = sortedTravelStep.slice(0, 10);
        data.needPremium = false;
      }
      res.status(200).json(data);
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
  // static async travelStepGeneratorPremium(req, res, next){
  //   try {
  //     let { budgetDestination, budgetHotel, CityId, DestinationIds, numberOfDestination } = req.body;
  //     if(DestinationIds.length > numberOfDestination){
  //       throw({name: "numberOfDestinationMinus"})
  //     }
  //     const hotels = await Hotel.findAll({
  //       where: {
  //         CityId,
  //         price: { [Op.lte]: budgetHotel }
  //       }
  //     })
  //     const destinations = await Destination.findAll({
  //       where: {
  //         CityId,
  //         cost: { [Op.lte]: budgetDestination }
  //       }
  //     })
  //     if (!hotels.length) {
  //       throw ({ name: "notMatchHotel" });
  //     }
  //     if (destinations.length < numberOfDestination) {
  //       throw ({ name: "notMatchDestination" });
  //     }
  //     const travelStep = [];
  //     const destinationCombinations = TravelStepsController.combinationGenerator(destinations, numberOfDestination);
  //     for (let hotel of hotels) {
  //       for (let destinationCombination of destinationCombinations) {
  //         let criteria = true;
  //         if (DestinationIds.length) {
  //           const exist = DestinationIds.every(el => destinationCombination.map(el => el.id).includes(el));
  //           if (!exist) {
  //             criteria = false;
  //           }
  //         }
  //         const totalPriceDestination = destinationCombination.reduce((accumulator, currentValue) => {
  //           if (typeof accumulator !== "number") {
  //             accumulator = accumulator.cost;
  //           }
  //           return accumulator + currentValue.cost
  //         })
  //         if (criteria && totalPriceDestination <= budgetDestination) {
  //           travelStep.push({ hotel, destination: destinationCombination });
  //         }
  //       }
  //     }
  //     if (!travelStep.length) {
  //       throw ({ name: "notMatchDestination" });
  //     }
  //     res.status(200).json({ travelStep: travelStep.slice(0,10) });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = TravelStepsController

