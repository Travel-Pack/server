'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/message.json").map((el) => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Messages", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
  }
};
