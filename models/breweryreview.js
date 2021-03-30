'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BreweryReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BreweryReview.init({
    username: DataTypes.STRING,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    brewery_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BreweryReview',
  });
  return BreweryReview;
};