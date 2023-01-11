'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Destination, {
        foreignKey: "DestinationId"
      })
      Image.belongsTo(models.Hotel, {
        foreignKey: "HotelId"
      })
    }
  }
  Image.init({
    DestinationId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    HotelId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image Url is required" },
        notEmpty: { msg: "Image Url is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
