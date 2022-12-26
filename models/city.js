'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required",
        },
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image is required",
        },
        notEmpty: {
          msg: "Image is required",
        },
      },
    },
    geocoding: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location is required",
        },
        notEmpty: {
          msg: "Location is required",
        },
      },
    },
    ProvinceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
