'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.TravelStep, {
        foreignKey: "HotelId",
      })
      Hotel.hasMany(models.Review, {
        foreignKey: "HotelId",
      })
      Hotel.hasMany(models.Image, {
        foreignKey: "HotelId",
      })
      Hotel.belongsTo(models.City, {
        foreignKey: "CityId",
      })
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.TEXT,
    address: DataTypes.TEXT,
    geocoding: DataTypes.STRING,
    isRecommended: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};