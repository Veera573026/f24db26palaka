const express = require('express');
const router = express.Router();

// Import plant controller
const plantsController = require('../controllers/plantsController');

// Route for getting all plants
router.get('/plants', plantsController.plant_list);

// Route for getting details of a single plant by ID
router.get('/plants/:id', plantsController.plant_detail);

// Route for creating a new plant
router.post('/plants', plantsController.plant_create_post);

// Route for deleting a plant by ID
router.delete('/plants/:id', plantsController.plant_delete);

// Route for updating a plant by ID
router.put('/plants/:id', plantsController.plant_update_put);

module.exports = router;
