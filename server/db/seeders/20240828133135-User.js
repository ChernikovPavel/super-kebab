'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Денис',
          email: 'denis@mail',
          password: '111',
          role: 'curier',
          address: 'г.Пушкин, ул. Пушкина, д.9',
          phone_number: '765876587658',
        },
        {
          username: 'Гриша',
          email: 'grisha@mail',
          password: '111',
          role: 'customer',
          address: 'г.Пушкин, ул. Миронова, д.9',
          phone_number: '324254326654',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
