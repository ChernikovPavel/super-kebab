'use strict';
const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ['id'] });
    const arr = [];

    for (let i = 1; i < 42; i++) {
      const old_order_price = Math.floor(Math.random() * 50 + 5) * 100
      const discount = Math.floor(Math.random() * 10 + 45)
      arr.push({
        old_order_price,
        new_order_price: Math.floor(old_order_price * discount / 10000)*100,
        discount,
        user_id: users[Math.floor(Math.random() * users.length)].dataValues.id,
        delivery_address: `г. Пушкина, д. ${i}`,
        status: Math.random() > .2 ? 'available' : 'delivery',
        coordinates: [59.70257936760503, 30.3656016400904],
      });
    }

    arr.push(
      {
        old_order_price: 1000,
        new_order_price: 500,
        discount: 50,
        user_id: 1,
        delivery_address: 'г. Пушкина',
        status: 'available',
        coordinates: [59.70257936760503, 30.3656016400904],
      },
      {
        old_order_price: 2000,
        new_order_price: 1000,
        discount: 50,
        user_id: 1,
        delivery_address: 'г. Пушкина',
        status: 'available',
        coordinates: [59.70942453703193, 30.412777278320295],
      },
      {
        old_order_price: 2200,
        new_order_price: 1100,
        discount: 50,
        user_id: 1,
        delivery_address: 'г. Пушкина',
        status: 'delivery',
        coordinates: [59.71980365548465, 30.39957008113096],
      },
    )
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          old_order_price: 1000,
          new_order_price: 500,
          discount: 50,
          user_id: 1,
          delivery_address: 'г. Пушкина',
          status: 'available',
          coordinates: [59.70257936760503, 30.3656016400904],
        },
        {
          old_order_price: 2000,
          new_order_price: 1000,
          discount: 50,
          user_id: 1,
          delivery_address: 'г. Пушкина',
          status: 'available',
          coordinates: [59.70942453703193, 30.412777278320295],
        },
        {
          old_order_price: 2200,
          new_order_price: 1100,
          discount: 50,
          user_id: 1,
          delivery_address: 'г. Пушкина',
          status: 'delivery',
          coordinates: [59.71980365548465, 30.39957008113096],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
