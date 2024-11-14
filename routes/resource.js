// routes/resource.js
const express = require('express');
const router = express.Router();
const plantsController = require('../collectors/plants');  // Correct path to controller

// Route to get all plants (API)
router.get('/plants', plantsController.plant_list);

// Route to get a single plant by ID (API)
router.get('/plants/:id', plantsController.plant_detail);

// Additional CRUD routes can be added here if needed.

module.exports = router;
