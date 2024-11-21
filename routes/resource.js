const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure correct path to the controller

// Route definitions
router.get('/plants', plantsController.plant_list); // Get all plants
router.get('/plants/:id', plantsController.plant_detail); // Get a single plant by ID
router.post('/plants', plantsController.plant_create_post); // Create a plant
router.put('/plants/:id', plantsController.plant_update_put); // Update a plant by ID
router.delete('/plants/:id', plantsController.plant_delete); // Delete a plant by ID
router.get('/plants/detail', plantsController.plant_view_one_Page); // View a single plant by query ID
router.post('/plants', plantsController.plant_create_page); // Create a plant

module.exports = router;
