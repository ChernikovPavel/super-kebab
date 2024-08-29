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
        {
          photo:
            'https://allopizza.su/storage/products/August2024/PWhkz9Hev5zyBJpomReU.webp',
          product_name: 'Сок Rich яблочный 0,2л',
          price: 170,
        },
        {
          photo:
            'https://allopizza.su/storage/products/August2024/USGjLCXUJtefpXwfPUMu.webp',
          product_name: 'Coca-Cola Original 0,33 л',
          price: 150,
        },
        {
          photo:
            'https://allopizza.su/storage/products/August2024/EiHLjCLYbExQ486sNV1B.webp',
          product_name: 'Доброе Комбо 1+1=3',
          price: 240,
        },
        {
          photo:
            'https://allopizza.su/storage/products/August2024/omHZpCGyo9PkmDnIfelh.webp',
          product_name: 'Сырные палочки с беконом',
          price: 200,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
