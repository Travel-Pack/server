'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.hasMany(models.Image, {
        foreignKey: "destinationId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Destination.belongsTo(models.City, {
        foreignKey: "CityId",
      });
    }
  }
  Destination.init({
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address is required",
        },
        notEmpty: {
          msg: "Address is required",
        },
      },
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Main image is required",
        },
        notEmpty: {
          msg: "Main image is required",
        },
      },
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Cost is required",
        },
        notEmpty: {
          msg: "Cost is required",
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
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "City is required",
        },
        notEmpty: {
          msg: "City is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};
