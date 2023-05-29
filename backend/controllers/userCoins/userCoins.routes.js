const { Router } = require('express');
const controllers = require('./userCoins.controller');

const router = Router();

// Get userCoins
router.get("/:userId", controllers.getUser);
// Get all users Coins
router.get("/", controllers.getUserCoins);

module.exports = router