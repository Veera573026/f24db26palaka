// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');

// Existing routes
router.get('/', plantsController.plant_list);  // Show all plants
router.get('/:id', plantsController.plant_detail);  // Show details of a specific plant
router.post('/', plantsController.plant_create_post);  // Create a new plant
router.put('/:id', plantsController.plant_update_put);  // Update an existing plant
router.delete('/:id', plantsController.plant_delete);  // Delete a plant

// Add the route for displaying a single plant by query parameter
router.get('/detail', plantsController.plant_view_one_Page);  // View one plant by query ID

module.exports = router;
