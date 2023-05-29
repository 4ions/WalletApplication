const { Router } = require('express');
const controllers = require('./transaction.controller');

const router = Router();

router.post('/:to/:from', controllers.createTransaction);
router.get('/:userId', controllers.getTransactions);




module.exports = router