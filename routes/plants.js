const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure the correct path to the controller

// Routes for CRUD operations
router.get('/', plantsController.plant_list); // Get all plants
router.get('/:id', plantsController.plant_detail); // Get a single plant by ID
router.post('/', plantsController.plant_create_post); // Create a plant
router.put('/:id', plantsController.plant_update_put); // Update a plant by ID
router.delete('/:id', plantsController.plant_delete); // Delete a plant by ID

module.exports = router;
