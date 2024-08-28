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
          coordinates: [59.70257936760503, 30.3656016400904],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
