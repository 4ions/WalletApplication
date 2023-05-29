'use strict';

const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    
    for (let i = 0; i < 10; i++) {
      const address = generateUniqueAddress();
      
      const user = {
        username: 'user' + i,
        address: address,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.push(user);
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

function generateUniqueAddress() {
  const bytes = crypto.randomBytes(16);
  return bytes.toString('hex');
}
