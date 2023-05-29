'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userCoins = [];

    const coins = ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Litecoin'];

    for (let userId = 1; userId <= 10; userId++) {
      for (let coinId = 1; coinId <= 5; coinId++) {
        const amount = generateRandomAmount(coins[coinId - 1]);
        
        const userCoin = {
          amount: amount,
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          coinId: coinId,
          userId: userId
        };

        userCoins.push(userCoin);
      }
    }

    await queryInterface.bulkInsert('UserCoins', userCoins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCoins', null, {});
  }
};

function generateRandomAmount(coinName) {
  // Ajusta la lógica para generar cantidades aleatorias similares a las reales para cada moneda
  let amount = 0;

  switch (coinName) {
    case 'Bitcoin':
      amount = getRandomNumber(0, 1);
      break;
    case 'Ethereum':
      amount = getRandomNumber(0, 10);
      break;
    case 'Solana':
      amount = getRandomNumber(0, 100);
      break;
    case 'Cardano':
      amount = getRandomNumber(0, 1000);
      break;
    case 'Litecoin':
      amount = getRandomNumber(0, 10000);
      break;
    default:
      amount = 0;
      break;
  }

  return amount;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
