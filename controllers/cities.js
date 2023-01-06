const { City, Province } = require("../models");

class CityController {
  static async getCities(req, res, next) {
    try {
      const cities = await City.findAll({ include: Province });
      res.status(200).json(cities);
    } catch (error) {
      next(error);
    }
  }

  static async getCityById(req, res, next) {
    try {
      const { slug } = req.params;

      const findCity = await City.findOne({
        where: { slug },
        include: [Province],
      });
      if (!findCity) throw { name: "UnknownId" };

      res.status(200).json({ city: findCity });
    } catch (error) {
      next(error);
    }
  }

  static async addCity(req, res, next) {
    try {
      const { name, image, geocoding, ProvinceId } = req.body;
      const slug = name.toLowerCase().split(' ').join('-');

      const findProvince = await Province.findByPk(ProvinceId);
      if (!findProvince) throw { name: "UnknownId" };

      const newCity = await City.create({ name, image, geocoding, ProvinceId, slug });
      res.status(201).json({ msg: `Success add ${newCity} to cities` });
    } catch (error) {
      next(error);
    }
  }

  static async editCity(req, res, next) {
    try {
      const { slug } = req.params;
      const { name, image, geocoding, ProvinceId } = req.body;

      // const findCity = await Citi.findByPk(id);
      const findCity = await Citi.findOne({ where: { slug }, });
      if (!findCity) throw { name: "UnknownId" };

      const findProvince = await Province.findByPk(ProvinceId);
      if (!findProvince) throw { name: "UnknownId" };

      await City.update({ name, image, geocoding, ProvinceId });
      res.status(200).json({ msg: `City ${findCity} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CityController;
