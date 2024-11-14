// routes/resource.js

const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Correct import path

// Route to get all plants
router.get('/plants', plantsController.plant_list);  // plant_list must be defined in the controller

// Route to get a single plant by ID
router.get('/plants/:id', plantsController.plant_detail);  // plant_detail must be defined in the controller

// Route to create a new plant (POST route)
router.post('/plants', plantsController.plant_create_post);

// Route to update a plant by ID (PUT)
router.put('/plants/:id', plantsController.plant_update_put);

// Route to delete a plant by ID
router.delete('/plants/:id', plantsController.plant_delete);

module.exports = router;
