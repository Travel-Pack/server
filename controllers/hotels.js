const { Op } = require("sequelize");
const {
  Hotel,
  User,
  Review,
  Image,
  sequelize,
  City,
} = require("../models");

class HotelController {

  static async readAllHotels(req, res, next) {
    try {
      const hotels = await Hotel.findAll({
        where: { id: { [Op.ne]: 1 } },
        include: [
          Review,
          Image
        ],
        order: [["price", "desc"]]
      })

      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
  }

  static async readOneHotel(req, res, next) {
    try {
      let hotel = await Hotel.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model:Review,
            include: User
          },
          Image
        ]
      })

      if (!hotel) throw { name: 'Hotel Not Found' }

      let avg_cost = 0
      let avg_fun = 0
      let avg_internet = 0
      let avg_safety = 0
      let hotelDetail

      if (hotel.Reviews.length == 0) {
        hotelDetail = {
          ...hotel.dataValues,
          avg_cost: avg_cost,
          avg_fun: avg_fun,
          avg_internet: avg_internet,
          avg_safety: avg_safety
        }
      } else if (hotel.Reviews.length > 0) {
        hotel.Reviews.forEach(el => {
          avg_cost += el.cost
          avg_fun += el.fun
          avg_internet += el.internet
          avg_safety += el.safety
        });
        hotelDetail = {
          ...hotel.dataValues,
          avg_cost: (avg_cost / hotel.Reviews.length).toFixed(1),
          avg_fun: (avg_fun / hotel.Reviews.length).toFixed(1),
          avg_internet: (avg_internet / hotel.Reviews.length).toFixed(1),
          avg_safety: (avg_safety / hotel.Reviews.length).toFixed(1)
        }
      }

      res.status(200).json(hotelDetail);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = HotelController;