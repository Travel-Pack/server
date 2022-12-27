const { Destination, User, Review, Image, sequelize } = require("../models")

class DestinationController {
  static async createDestination(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { name, address, mainImg, cost, geocoding, CityId, UserId, imgUrl } = req.body
      // const UserId = req.user.id
      const newDestination = await Destination.create({ name, address, mainImg, cost, geocoding, CityId, UserId }, { transaction: t }) // , UserId
      // console.log(newDestination, "<<--- newDestination di controller");
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
      const destination = await Destination.findAll({
        include: [
          { model: Review, include: [User] },
          { model: Image, order: [['id', 'DESC']] }
        ]
      })

      res.status(200).json(destination)
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }
  static async updateDestination(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { name, address, mainImg, cost, geocoding, CityId, UserId, imgUrl } = req.body
      // const UserId = req.user.id
      const isDestination = await Destination.findByPk(req.params.id)
      if (isDestination) {
        const updatedDestination = await Destination.update({ name, address, mainImg, cost, geocoding, CityId, UserId, imgUrl }, { where: { id: req.params.id }, transaction: t })

        const currentImages = await Image.findAll({ where: { DestinationId: isDestination.id, order: [['id', 'ASC']] } })
        const images = imgUrl.map(el => {
          return {
            DestinationId: isDestination.id,
            imgUrl: el
          }
        })
        if (imgUrl.length == currentImages.length) {// bulkUpdate
          for (let i = 0; i < imgUrl.length; i++) {
            await Image.update(images, { where: { id: isDestination.id }, transaction: t })
          }
        } else if (imgUrl.length > currentImages.length) { // create / update
          await Image.bulkCreate(images, { updateOnDuplicate: ["imgUrl"], transaction: t })
        }
      } else throw { name: "Destination Not Found" }
      await t.commit()
      res.status(201).json(destination)
    } catch (error) {
      await t.rollback()
      console.log(error);
      // next(error)
    }
  }
  static async deleteDestination(req, res, next) {
    try {
      if (await Destination.findByPk(req.params.id)) {
        const deletedDestination = await Destination.destroy({ where: { id: req.params.id } })
      } else throw { name: "Destination Not Found" }

      res.status(201).json("Success deleting destionation with ID: " + req.params.id)
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }
}

module.exports = DestinationController

