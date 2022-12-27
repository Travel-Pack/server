const { Favourite, Destination } = require("../models");

class FavouriteController {
    static async readFavourites(req, res, next) {
        try {
          const UserId = req.user.id;
          const readFavourites = await Favourite.findAll({
            where: { UserId },
            include: [
              {
                model: Destination
              },
            ],
          });

          res.status(200).json(readFavourites);
        } catch (error) {
          next(error);
        }
    }

    static async addFavourites(req, res, next) {
        try {
          const UserId = req.user.id;
          const { name, address, mainImg, cost, geocoding, CityId } = req.body;

          const [findDestination, createdDestination] = await Destination.findOrCreate({
            where: { name },
            defaults: { name, address, mainImg, cost, geocoding, CityId },
          });

          const DestinationId = findDestination.id;

          const [findFavourites, createdFavourites] = await Favourite.findOrCreate({
            where: { DestinationId, UserId },
            defaults: { DestinationId, UserId },
          });

          if (!createdFavourites) {
            throw { name: "Already in your favourites" };
          }

          res.status(201).json({
            message: `${findDestination.name} successfully added to your favourites`,
          });
        } catch (error) {
          next(error);
        }
    }
}

module.exports = FavouriteController
