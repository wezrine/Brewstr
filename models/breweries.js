'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Breweries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Breweries.hasMany(models.BreweryReview, { as:'BreweryReviews', foriegnkey:'BreweryId'})
    }
  };
  Breweries.init({
    username: DataTypes.STRING,
    BreweryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Breweries',
  });
  return Breweries;
};