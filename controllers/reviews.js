const { Review, User } = require("../models");

class ReviewController {
  static async postReview(req, res, next) {
    try {
      let { DestinationId, cost, fun, internet, safety, comment, HotelId } =
        req.body;
      let UserId = req.user.id;
      let newReview = await Review.create({
        DestinationId,
        cost,
        fun,
        internet,
        safety,
        comment,
        UserId,
        HotelId,
      });
      // console.log(newReview, ">>>");
      const findUser = await User.findByPk(UserId);

      await User.increment({ point: 1 }, { where: { id: UserId } });
      // console.log(findUser, "<<< USER");
      res
        .status(201)
        .json({ msg: `New Review with id ${newReview.id} has been created` });
    } catch (error) {
      next(error);
    }
  }

  static async putReview(req, res, next) {
    try {
      let { DestinationId, cost, fun, internet, safety, comment } = req.body;
      let { id } = req.params;

      let calledReview = await Review.findByPk(id);
      if (!calledReview) throw { name: "UnknownId" };

      await calledReview.update({
        DestinationId,
        cost,
        fun,
        internet,
        safety,
        comment,
      });
      res
        .status(201)
        .json({ msg: `Review with id ${calledReview.id} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async delReview(req, res, next) {
    try {
      let { id } = req.params;

      let calledReview = await Review.findByPk(id);
      if (!calledReview) throw { name: "UnknownId" };

      await calledReview.destroy();
      res
        .status(200)
        .json({ msg: `Review with id ${calledReview.id} has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewByDestination(req, res, next) {
    try {
      const { DestinationId } = req.params;
      let destinationReviews = await Review.findAll({
        include: [User],
        where: { DestinationId },
      });
      // console.log(destinationReviews, "<<<<<< BUKAN ERROR");
      if (destinationReviews.length == 0) throw { name: 'Destination Not Found' }
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
        });
      });

      let averageReviews = {
        avgCost: (sumCost /= destinationReviews.length),
        avgFun: (sumFun /= destinationReviews.length),
        avgInternet: (sumInternet /= destinationReviews.length),
        avgSafety: (sumSafety /= destinationReviews.length),
      };

      res.status(200).json({ averageReviews, commentArr });
    } catch (error) {
      next(error);
    }
  }
  static async getReviewByHotel(req, res, next) {
    try {
      const { HotelId } = req.params;
      let hotels = await Review.findAll({
        include: [User],
        where: { HotelId },
      });
      if (hotels.length == 0) throw { name: "Hotel Not Found" };
      let sumCost = 0;
      let sumFun = 0;
      let sumInternet = 0;
      let sumSafety = 0;
      let commentArr = [];

      hotels.forEach((el) => {
        sumCost += el.cost;
        sumFun += el.fun;
        sumInternet += el.internet;
        sumSafety += el.safety;
        commentArr.push({
          user: el.User.fullName,
          comment: el.comment,
        });
      });

      let averageReviews = {
        avgCost: (sumCost /= hotels.length),
        avgFun: (sumFun /= hotels.length),
        avgInternet: (sumInternet /= hotels.length),
        avgSafety: (sumSafety /= hotels.length),
      };

      res.status(200).json({ averageReviews, commentArr });
    } catch (error) {
      next(error);
    }
  }
  static async getReviews(req, res, next) {
    try {
      let destinationReviews = await Review.findAll({
        include: [User],
      });
      let reviews = await Review.findAll({
        include: [User],
      });
      let sumCost = 0;
      let sumFun = 0;
      let sumInternet = 0;
      let sumSafety = 0;

      destinationReviews.forEach((el) => {
        sumCost += el.cost;
        sumFun += el.fun;
        sumInternet += el.internet;
        sumSafety += el.safety;
      });

      let averageReviews = {
        avgCost: (sumCost /= destinationReviews.length).toFixed(1),
        avgFun: (sumFun /= destinationReviews.length).toFixed(1),
        avgInternet: (sumInternet /= destinationReviews.length).toFixed(1),
        avgSafety: (sumSafety /= destinationReviews.length).toFixed(1),
      };
      let reviewByUser = reviews.map((el) => {
        return {
          comment: el.comment,
          user: el.User.fullName,
          isPremium: el.User.isPremium
        };
      });

      res.status(200).json({ averageReviews, reviewByUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
