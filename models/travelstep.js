'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TravelStep.hasMany(models.Favourite, {
        foreignKey: 'UseTravelStepId'
      });
    }
  }
  TravelStep.init({
    UserId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TravelStep',
  });
  return TravelStep;
};