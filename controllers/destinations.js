const { Destination, User, Review, Image, sequelize } = require("../models")

class DestinationController {
  static async createDestination(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { name, address, mainImg, cost, geocoding, CityId, UserId, imgUrl } = req.body
      const slug = name.toLowerCase().split(' ').join('-');

      const newDestination = await Destination.create({ name, address, mainImg, cost, geocoding, CityId, UserId, slug }, { transaction: t })
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
      next(error)
    }
  }
  static async readAllDestination(req, res, next) {
    try {
      const destinations = await Destination.findAll({
        include: [
          { model: Review },
          Image
        ]
      })

      res.status(200).json(destinations)
    } catch (error) {
      next(error)
    }
  }
  static async readOneDestination(req, res, next) {
    try {
      const { slug } = req.params

      const destination = await Destination.findOne({
        where: { slug: slug },
        include: [
          { model: Review },
          Image
        ]
      })

      res.status(200).json(destination)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DestinationController

