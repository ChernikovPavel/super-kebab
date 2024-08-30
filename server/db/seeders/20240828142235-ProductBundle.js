'use strict';
const { User, Product, Order } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    const product = await Product.findAll({ attributes: ['id'] });
    const orders = await Order.findAll({ attributes: ['id'] });

    for (let i = 0; i < 50; i++) {
      arr.push({
        order_id: orders[i % orders.length].dataValues.id,
        product_id:
          product[Math.floor(Math.random() * product.length)].dataValues.id,
      });
    }

    await queryInterface.bulkInsert('ProductBundles', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductBundles', null, {});
  },
};
