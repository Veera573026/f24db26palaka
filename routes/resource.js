const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Correct path to controller

// Route to get all plants
router.get('/plants', plantsController.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plantsController.plant_detail);

// You can add more routes if needed, for example, post, put, and delete.

module.exports = router;
