'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("tasks", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'user_id',
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("tasks", "user_id")
  }
};
