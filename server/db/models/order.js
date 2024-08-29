'use strict';
const { Model } = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, Cart, ProductBundle }) {
      this.belongsToMany(User, {
        through: {
          model: Cart,
          as: 'customer',
          foreignKey: 'user_id',
        },
      });
      this.belongsTo(User, { foreignKey: 'user_id', as: 'courier' });

      this.hasMany(ProductBundle, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      old_order_price: DataTypes.INTEGER,
      new_order_price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      delivery_address: DataTypes.STRING,
      coordinates: DataTypes.ARRAY(DataTypes.DECIMAL),
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
