"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/review.json").map((el) => {
      delete el.namaDestinasi;
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // console.log(data);
    await queryInterface.bulkInsert("Reviews", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
