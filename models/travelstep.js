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
      TravelStep.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      TravelStep.hasMany(models.TravelStep_Destination, {
        foreignKey: "planId"
      })
    }
  }
  TravelStep.init({
    budget: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    destinationPercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelStep',
  });
  return TravelStep;
};