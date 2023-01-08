'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Destination, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Review, {
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    fullName: {
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required",
        },
        notEmpty: {
          msg: "Phone number is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email format is not valid",
        },
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email is required",
        },
        // async unique(value) {
        //   const findUser = await User.findOne({ where: { email: value } });
        //   if (findUser) throw new Error("Email already exist");
        // },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
        minimumLength(str) {
          if (str.length < 5 || !str) {
            throw new Error('Minimum password length must be 5 letter');
          }
        }
      },
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Customer"
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });

  User.beforeUpdate((user) => {
    user.password = hashPassword(user.password);
  });

  // User.afterUpdate((user) => {
  //   user.password = hashPassword(user.password);
  // });

  return User;
};
