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
  // static async createDestination(req, res, next) {
  //   const t = await sequelize.transaction();
  //   try {
  //     const { name, address, mainImg, cost, geocoding, CityId, imgUrl } = req.body
  //     const UserId = req.user.id
  //     const slug = name.toLowerCase().split(' ').join('-');

  //     const newDestination = await Destination.create(
  //       { name, address, mainImg, cost, geocoding, CityId, UserId, slug },
  //       { transaction: t }
  //     );
  //     if (imgUrl) {
  //       const images = imgUrl.map((el) => {
  //         return {
  //           DestinationId: newDestination.id,
  //           imgUrl: el,
  //         };
  //       });
  //       await Image.bulkCreate(images, { transaction: t });
  //     }

  //     await t.commit();
  //     res.status(201).json("Ok - Destination Added");
  //   } catch (error) {
  //     await t.rollback();
  //     next(error);
  //   }
  // }
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
      const hotel = await Hotel.findOne({
        where: { slug: req.params.slug },
        include: [
          Review,
          Image
        ]
      })

      let avg_cost = 0
      let avg_fun = 0
      let avg_internet = 0
      let avg_safety = 0
      let hotelDetail

      if (hotel.Reviews) {
        hotelDetail = {
          ...hotel,
          avg_cost: avg_cost,
          avg_fun: avg_fun,
          avg_internet: avg_internet,
          avg_safety: avg_safety
        }
      } else {
        hotel.Reviews.forEach(el => {
          console.log(el, "<<<<<");
          // avg_cost += el.Review.cost
          // avg_fun += el.Review.fun
          // avg_internet += el.Review.internet
          // avg_safety += el.Review.safety
        });
        // hotelDetail = {
        //   ...hotel,
        //   avg_cost: avg_cost / hotel.Reviews.length,
        //   avg_fun: avg_fun / hotel.Reviews.length,
        //   avg_internet: avg_internet / hotel.Reviews.length,
        //   avg_safety: avg_safety / hotel.Reviews.length
        // }
      }
      // console.log(hotelDetail, "<<<<<<- hotelDetail");
      res.status(200).json(hotelDetail);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = HotelController;