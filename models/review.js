'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Destination, {
        foreignKey: "DestinationId",
      })
      Review.belongsTo(models.Hotel, {
        foreignKey: "HotelId"
      })
      Review.belongsTo(models.User, {
        foreignKey: "UserId",
      })
    }
  }
  Review.init({
    DestinationId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    HotelId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    cost: {
      type: DataTypes.INTEGER,
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
    fun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Fun is required",
        },
        notEmpty: {
          msg: "Fun is required",
        },
      },
    },
    internet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Internet is required",
        },
        notEmpty: {
          msg: "Internet is required",
        },
      },
    },
    safety: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Safety is required",
        },
        notEmpty: {
          msg: "Safety is required",
        },
      },
    },
    comment: DataTypes.TEXT,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
