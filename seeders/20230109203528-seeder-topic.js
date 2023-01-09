'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/topic.json").map((el) => {
      el.slug = el.title.toLocaleLowerCase().replace(/ /g, '-')
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Topics", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Topics", null, {});
  }
};
