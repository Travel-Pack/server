'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
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
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      HotelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id",
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Images');
  }
};
