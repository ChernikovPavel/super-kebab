'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push({
        username: i,
        email: i + '@' + i,
        password: bcrypt.hashSync(String(i), 10),
        role: Math.random() > 0.5 ? 'courier' : 'user',
        address: 'г.Пушкин, ул. Пушкина, д.' + i,
        phone_number: '765876587658',
      });
    }
    arr.push(
      {
        username: 'Денис',
        email: 'denis@mail',
        password: '111',
        role: 'courier',
        address: 'г.Пушкин, ул. Пушкина, д.11',
        phone_number: '765876587658',
      },
      {
        username: 'Гриша',
        email: 'grisha@mail',
        password: '111',
        role: 'user',
        address: 'г.Пушкин, ул. Миронова, д.12',
        phone_number: '324254326654',
      }
    );

    await queryInterface.bulkInsert('Users', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
