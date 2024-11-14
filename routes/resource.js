// routes/resource.js
const express = require('express');
const router = express.Router();
const plants = require('../controllers/plants');  // Correct path to your controller

// Route to get all plants and render them using the controller
router.get('/plants', plants.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plants.plant_detail);

module.exports = router;
