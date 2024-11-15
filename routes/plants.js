const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plants');

// Routes
router.get('/', plantController.plant_list); // Get all plants
router.post('/', plantController.plant_create_post); // Create a plant
router.get('/:id', plantController.plant_detail); // Get one plant by ID
router.put('/:id', plant_controller.plant_update_put);
router.delete('/:id', plantController.plant_delete); // Delete one plant by ID

module.exports = router;
