const request = require("supertest");
const app = require("../app.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
