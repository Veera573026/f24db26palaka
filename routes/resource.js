// routes/resource.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Corrected path to controllers/plants.js

// Route to get all plants
router.get('/plants', plantsController.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plantsController.plant_detail);

module.exports = router;
