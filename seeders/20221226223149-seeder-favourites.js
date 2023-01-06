'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // const data = require("../data/favourite.json").map((el) => {
    //   delete el.id;
    //   return {
    //     ...el,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    // });

    // await queryInterface.bulkInsert("Favourites", data, {});
  },

  async down(queryInterface, Sequelize) {

    // await queryInterface.bulkDelete("Favourites", null, {});
  }
};
