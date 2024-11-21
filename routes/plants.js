// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Ensure the path is correct

// Define routes
router.get('/', plantsController.plant_list);  // Show all plants
router.get('/:id', plantsController.plant_detail);  // Show details of a specific plant
router.post('/', plantsController.plant_create_post);  // Create a new plant
router.put('/:id', plantsController.plant_update_put);  // Update an existing plant
router.delete('/:id', plantsController.plant_delete);  // Delete a plant

module.exports = router;
