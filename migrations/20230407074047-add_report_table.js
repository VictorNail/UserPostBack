'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      reason: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    },{
      timestamps: false
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
