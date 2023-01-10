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
  // static async createDestination(req, res, next) {
  //   const t = await sequelize.transaction();
  //   try {
  //     const { name, address, mainImg, cost, geocoding, CityId, imgUrl } =
  //       req.body;
  //     const UserId = req.user.id;
  //     const slug = name.toLowerCase().split(" ").join("-");

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
  static async readBestDestination(req, res, next) {
    try {
      const destinations = await Destination.findAll({
        include: [Review, City]
      })

      let avg_cost = 0
      let avg_fun = 0
      let avg_internet = 0
      let avg_safety = 0
      let avg = 0
      let test = []
      let obj = {
        id: 0,
        name: "",
        slug: "",
        cost: 0,
        mainImg: "",
        cityName: "",
        avg_review: 0,
      }
      destinations.forEach(el => {
        avg_cost = avg_fun = avg_internet = avg_safety = avg = 0
        el.Reviews.forEach(el => {
          avg_cost += el.cost
          avg_fun += el.fun
          avg_internet += el.internet
          avg_safety += el.safety
        })

        let divide = el.Reviews.length > 0 ? el.Reviews.length : 1
        avg_cost = (avg_cost / divide).toFixed(1)
        avg_fun = (avg_fun / divide).toFixed(1)
        avg_internet = (avg_internet / divide).toFixed(1)
        avg_safety = (avg_safety / divide).toFixed(1)

        let divide2 = el.Reviews.length > 0 ? 4 : 1

        avg = (parseFloat(avg_cost) + parseFloat(avg_fun) + parseFloat(avg_internet) + parseFloat(avg_safety)) / divide2
        // console.log(avg_cost, avg_fun, avg_internet, avg_safety, "-----avg--> ", avg, "--div2--> ", divide2);

        obj = {
          id: el.id,
          name: el.name,
          slug: el.slug,
          cost: el.cost,
          mainImg: el.mainImg,
          cityName: el.City.name,
          avg_review: isNaN(avg) ? 0 : avg,
        }
        test.push(obj)
      })

      test.sort((a, b) => {
        return (b.avg_review - a.avg_review)
      })

      // test.slice(1, 10)
      // console.log(test.length, "<<< Length");
      res.status(200).json(test.slice(0, 10))
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
      if (!destination) throw { name: 'Destination Not Found' }
      const destinationReviews = await Review.findAll({
        include: [User], where: { DestinationId: destination.id },
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
        commentArr.push({
          user: el.User.fullName,
          comment: el.comment,
          createdAt: el.createdAt
        });
        // commentArr.push(el.comment);
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