'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DestinationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Destinations",
          key: "id",
        },
      },
      HotelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id",
        },
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fun: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      internet: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      safety: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
