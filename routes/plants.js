const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plants');  // Correct path to controller

// Define routes for plants
router.get('/', plantController.plant_list);  // Get all plants
router.post('/', plantController.plant_create_post);  // Create a new plant
router.put('/:id', plantController.plant_update_put);  // Update an existing plant
router.delete('/:id', plantController.plant_delete);  // Delete a plant by ID
router.get('/:id', plantController.plant_detail);  // Get details of a specific plant

module.exports = router;
