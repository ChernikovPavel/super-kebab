'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductBundles', null, {});
  },
};
