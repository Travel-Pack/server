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
      Favourite.belongsTo(models.Destination);
    }
  }
  Favourite.init({
    DestinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Destination is required" },
        notEmpty: { msg: "Destination is required" },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User is required" },
        notEmpty: { msg: "User is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};
