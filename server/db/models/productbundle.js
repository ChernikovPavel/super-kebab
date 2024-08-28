'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductBundle extends Model {
    static associate({ Order, Product }) {
      this.belongsTo(Order, { foreignKey: 'order_id' });
      this.belongsTo(Product, { foreignKey: 'product_id' });
    }
  }
  ProductBundle.init(
    {
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductBundle',
    }
  );
  return ProductBundle;
};
