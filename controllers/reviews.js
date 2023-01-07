const { Review, User } = require("../models");

class ReviewController {
  static async postReview(req, res, next) {
    try {
      let { DestinationId, cost, fun, internet, safety, comment } = req.body;
      let UserId = req.user.id;
      let newReview = await Review.create({
        DestinationId,
        cost,
        fun,
        internet,
        safety,
        comment,
        UserId,
      });

      const findUser = await User.findByPk(UserId);

			if (!findUser) {
        throw({ name: 'User not found' });
      }

      await User.update({ point: findUser.point += 1 }, { where: { UserId } });

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
        .status(201)
        .json({ msg: `Review with id ${calledReview.id} has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewByDestination(req, res, next) {
    try {
      const { DestinationId } = req.params;
      let destinationReviews = await Review.findAll({
        where: { DestinationId },
      });
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
}

module.exports = ReviewController;
