const { Router } = require('express');
const controllers = require('./coin.controller');

const router = Router();

// Get coin by id
router.get("/:id", controllers.getCoin);
// Get all coins
router.get("/", controllers.getCoins);
// Create new coin
router.post("/", controllers.createCoin);
// Delete coin
router.delete("/:id", controllers.deleteCoin);
// Update coin
router.put("/:id", controllers.updateCoin);

module.exports = router