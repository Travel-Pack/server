'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.Destination, {
        foreignKey: "DestinationId",
      });
      Favourite.belongsTo(models.TravelStep, {
        foreignKey: "UseTravelStepId",
      });
    }
  }
  Favourite.init({
    DestinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "DestinationId is required" },
        notEmpty: { msg: "DestinationId is required" },
      },
    },
    UseTravelStepId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "TravelStepId is required" },
        notEmpty: { msg: "TravelStepId is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};
