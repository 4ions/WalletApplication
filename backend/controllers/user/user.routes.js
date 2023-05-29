const { Router } = require('express');
const controllers = require('./user.controller');

const router = Router();

// Get user
router.get("/:id", controllers.getUser);
// Get all users
router.get("/", controllers.getUsers);

module.exports = router