'use strict';
const { Order, User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    const orders = await Order.findAll({ attributes: ['id'] });
    const users = await User.findAll({ attributes: ['id'] });
    const max = Math.min(users.length, orders.length);

    for (let i = 0; i < 10; i++) {
      arr.push({
        user_id: users[Math.floor(Math.random() * users.length)].dataValues.id,
        order_id:
          orders[Math.floor(Math.random() * orders.length)].dataValues.id,
      });
    }

    await queryInterface.bulkInsert('Carts', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
