'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
