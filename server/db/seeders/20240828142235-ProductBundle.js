'use strict';
const {User, Product, Order} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      const arr = []
      const product = await Product.findAll({attributes: ['id']})
      const orders = await Order.findAll({attributes: ['id']})
      
      for(let i = 0; i < 42; i++){
        arr.push({
          order_id: orders[Math.floor(Math.random() * orders.length)].dataValues.id,
          product_id: product[Math.floor(Math.random() * product.length)].dataValues.id
        })
      }


    await queryInterface.bulkInsert(
      'ProductBundles',
      [
        {
          product_id: 1,
          order_id: 1,
        },
        {
          product_id: 2,
          order_id: 1,
        },
        {
          product_id: 5,
          order_id: 1,
        },
        {
          product_id: 6,
          order_id: 2,
        },
        {
          product_id: 2,
          order_id: 2,
        },
        {
          product_id: 3,
          order_id: 2,
        },
        {
          product_id: 4,
          order_id: 3,
        },
        {
          product_id: 3,
          order_id: 3,
        },
        {
          product_id: 1,
          order_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductBundles', null, {});
  },
};
