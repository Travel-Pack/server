'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TravelStep_Destinations', {
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
          key: "id"
        }
      },
      HotelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id"
        }
      },
      planId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "TravelSteps",
          key: "id"
        }
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
    await queryInterface.dropTable('TravelStep_Destinations');
  }
};