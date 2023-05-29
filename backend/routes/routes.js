const users = require("../controllers/user/user.routes")
const coin = require("../controllers/coin/coin.routes")
const userCoins = require("../controllers/userCoins/userCoins.routes")
const transactions = require("../controllers/transactions/transaction.routes")

const routes = function (server) {
    
    server.use('/api/v1/users', users)
    server.use('/api/v1/coin', coin)
    server.use('/api/v1/userCoins', userCoins)
    server.use('/api/v1/transactions', transactions)

};

// Importa los controladores necesarios

// Rutas de la API


module.exports = routes;