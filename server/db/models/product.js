'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ ProductBundle, Order }) {
      this.belongsToMany(Order, {through: {model: ProductBundle}, foreignKey: 'product_id'})
    }
  }
  Product.init(
    {
      photo: DataTypes.STRING,
      product_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
