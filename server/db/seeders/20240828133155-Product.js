'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          photo:
            'https://allopizza.su/storage/products/August2024/z1PG2Y1VLTqnytzKT27A.webp',
          product_name: 'Pizza Деревенская',
          price: 570,
        },
        {
          photo:
            'https://allopizza.su/storage/products/August2024/Lvy1ASjJMuve4vzUo8IR.webp',
          product_name: 'Pizza Том Ям',
          price: 570,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
