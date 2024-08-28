'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Order, Cart }) {
      this.belongsToMany(Order, {
        through: {
          model: Cart,
          as: 'customer',
          foreignKey: 'user_id',
        },
      });
      this.hasMany(Order, {
        foreignKey: 'user_id',
        as: 'OwnedOrders',
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
