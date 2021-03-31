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
      models.BreweryReview.belongsTo(models.User, {as:'user', foreignKey:'UserId'})
    }
  };
  BreweryReview.init({
    username: DataTypes.STRING,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    brewery_id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BreweryReview',
  });
  return BreweryReview;
};