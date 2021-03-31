'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BreweryReviews', 'userId', {
      type:Sequelize.INTEGER, 
      references: {model:'Users', field:'id'}
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
