const { Destination, User, Review, Image, sequelize } = require("../models")

class DestinationController {
  static async createDestination(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { name, address, mainImg, cost, geocoding, CityId, UserId, imgUrl } = req.body
      const newDestination = await Destination.create({ name, address, mainImg, cost, geocoding, CityId, UserId }, { transaction: t }) // , UserId
      console.log(newDestination, "<<--- newDestination di controller");
      if (imgUrl) {
        const images = imgUrl.map(el => {
          return {
            DestinationId: newDestination.id,
            imgUrl: el
          }
        })
        await Image.bulkCreate(images, { transaction: t })
      }

      await t.commit()
      res.status(201).json("Ok - Destination Added")
    } catch (error) {
      await t.rollback()
      console.log(error);
      // next(err)
    }
  }
  static async readAllDestination(req, res, next) {
    try {
      const { name, address, mainImg, cost, geocoding, CityId } = req.body
      const destination = await Destination.findAll({
        include: [
          { model: Review },
          Image
        ]
      })

      res.status(200).json(destination)
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }
}

module.exports = DestinationController

