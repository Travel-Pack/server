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
      // define association here
    }
  }
  TravelStep.init({
    UserId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelStep',
  });
  return TravelStep;
};