'use strict';
const { Model } = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, Cart, ProductBundle, Product }) {

      this.belongsToMany(User, {
        as: 'ordersInCart',
        through: {
          model: Cart,
        },
        foreignKey: 'order_id',
      });

      this.belongsToMany(Product, {
        through: { model: ProductBundle },
        foreignKey: 'order_id',
        // foreignKey: 'product_id',
      });

      this.belongsTo(User, { as: 'courier', foreignKey: 'user_id' });
      this.hasMany(Cart, { foreignKey: 'order_id' });
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
