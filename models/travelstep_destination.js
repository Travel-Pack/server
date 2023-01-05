'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelStep_Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TravelStep_Destination.belongsTo(models.TravelStep, {
        foreignKey: "planId",
      });
      TravelStep_Destination.belongsTo(models.Destination, {
        foreignKey: "DestinationId",
      });
      TravelStep_Destination.belongsTo(models.Hotel, {
        foreignKey: "HotelId",
      });
    }
  }
  TravelStep_Destination.init({
    planId: DataTypes.INTEGER,
    DestinationId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelStep_Destination',
  });
  return TravelStep_Destination;
};