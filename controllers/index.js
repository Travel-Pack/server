const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");

class Controller {
  static async register(req, res, next) {
    try {
      const { body } = req;

      const register = await User.create(body);

      res.status(201).json({
        message: `Success create email ${register.email}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "Invalid email or password" };
      }

      if (!comparePassword(password, findUser.password)) {
        throw { name: "Invalid email or password" };
      }

      res.status(200).json({
        message: `Success login with email ${findUser.email}`,
        access_token: createToken({ id: findUser.id }),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
