"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = require("../data/cities.json").map((el) => {
      delete el.id;
      return {
        ...el,
        slug: el.name.toLocaleLowerCase().split(" ").join("-"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // console.log(data, ">>");
    await queryInterface.bulkInsert("Cities", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
