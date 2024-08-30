'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Order, Cart }) {
      this.belongsToMany(Order, {
        through: {
          model: Cart,
          as: 'customer',
        },
        foreignKey: 'user_id',
        as: 'ordersInCart',
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
      role: {
        type: DataTypes.ENUM(['user', 'courier']), 
        allowNull: false,
        defaultValue: 'user', 
      },
      
       
      
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
