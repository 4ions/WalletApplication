'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coins = [
      {
        name: 'Bitcoin',
        symbol:'BTC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ethereum',
        symbol:'ETH',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cardano',
        symbol:'ADA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Solana',
        symbol:'SOL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Litecoin',
        symbol:'LTC',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Coins', coins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coins', null, {});
  }
};
