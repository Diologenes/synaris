'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(500),
      },
      content: {
        type: Sequelize.TEXT,
      },
      tags: {
        type: Sequelize.STRING(500),
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      isFavourite: {
        type: Sequelize.INTEGER(1),
        defaultValue: null,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      visitedAt: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};