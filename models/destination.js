"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "DestinationId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Destination.hasMany(models.Review, {
        foreignKey: "DestinationId",
      });
      Destination.hasMany(models.Favourite, {
        foreignKey: "DestinationId",
      });
      Destination.belongsTo(models.City, {
        foreignKey: "CityId",
      });
      Destination.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Destination.init(
    {
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slug is required",
          },
          notEmpty: {
            msg: "Slug is required",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
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
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Destination",
    }
  );
  return Destination;
};
