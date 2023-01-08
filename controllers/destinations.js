const { Op } = require("sequelize");
const {
  Destination,
  User,
  Review,
  Image,
  sequelize,
  City,
} = require("../models");

class DestinationController {
  static async createDestination(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, address, mainImg, cost, geocoding, CityId, imgUrl } =
        req.body;
      const UserId = req.user.id;
      const slug = name.toLowerCase().split(" ").join("-");

      const newDestination = await Destination.create(
        { name, address, mainImg, cost, geocoding, CityId, UserId, slug },
        { transaction: t }
      );
      if (imgUrl) {
        const images = imgUrl.map((el) => {
          return {
            DestinationId: newDestination.id,
            imgUrl: el,
          };
        });
        await Image.bulkCreate(images, { transaction: t });
      }

      await t.commit();
      res.status(201).json("Ok - Destination Added");
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async readAllDestination(req, res, next) {
    try {
      const { orderBy, searchByCity, filterCost, searchByDest } = req.query;
      const options = {};
      options.include = [{ model: Review }, Image];

      if (orderBy) {
        if (orderBy === "name") {
          options.order = [["name", "asc"]];
        }
        if (orderBy === "costHighToLow") {
          options.order = [["cost", "desc"]];
        }
        if (orderBy === "costLowToHigh") {
          options.order = [["cost", "asc"]];
        }
      }

      if (filterCost) {
        options.where = { cost: { [Op.lte]: filterCost } };
      }

      let findCity;
      let destinations;
      if (searchByCity) {
        findCity = await City.findOne({
          where: { name: { [Op.iLike]: `%${searchByCity}%` } },
        });
        if (!findCity) {
          throw { name: "City does not exist" };
        }
        options.where = { CityId: findCity.id };
        destinations = await Destination.findAll(options);
        res.status(200).json({ destinations, city: findCity });
      } else if (searchByDest) {
        options.where = { name: { [Op.iLike]: `%${searchByDest}%` } };
        destinations = await Destination.findAll(options);
        res.status(200).json(destinations);
      } else {
        destinations = await Destination.findAll(options);
        res.status(200).json(destinations);
      }
    } catch (error) {
      next(error);
    }
  }
  static async readOneDestination(req, res, next) {
    try {
      const { slug } = req.params;

      const destination = await Destination.findOne({
        where: { slug: slug },
        include: [
          { model: Review },
          Image,
          {
            model: User,
            attributes: ["fullName"],
          },
        ],
      });
      const destinationReviews = await Review.findAll({
        where: { DestinationId: destination.id },
      });
      if (!destinationReviews) {
        throw { name: "notMatchReview" };
      }
      let sumCost = 0;
      let sumFun = 0;
      let sumInternet = 0;
      let sumSafety = 0;
      let commentArr = [];

      destinationReviews.forEach((el) => {
        sumCost += el.cost;
        sumFun += el.fun;
        sumInternet += el.internet;
        sumSafety += el.safety;
        commentArr.push(el.comment);
      });

      let averageReviews = {
        averageCost: (sumCost /= destinationReviews.length),
        averageFun: (sumFun /= destinationReviews.length),
        averageInternet: (sumInternet /= destinationReviews.length),
        averageSafety: (sumSafety /= destinationReviews.length),
      };

      res
        .status(200)
        .json({ destination, reviews: averageReviews, comment: commentArr });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DestinationController;
