'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCoin.belongsTo(models.User, {foreignKey: 'userId'})
      UserCoin.belongsTo(models.Coin, {foreignKey: 'coinId'})
    }
  }
  UserCoin.init({
    amount: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UserCoin',
  });
  return UserCoin;
};