const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure correct path to the controller

// Route definitions
router.get('/', plantsController.plant_list);  // Get all plants
router.get('/:id', plantsController.plant_detail);  // Get a single plant by ID
router.post('/', plantsController.plant_create_post);  // Create a plant
router.put('/:id', plantsController.plant_update_put);  // Update a plant by ID
router.delete('/:id', plantsController.plant_delete);  // Delete a plant by ID
router.get('/detail', plantsController.plant_view_one_Page);  // View a single plant by query ID

module.exports = router;
