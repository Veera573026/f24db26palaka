const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plantsController');

// Route to get all plants
router.get('/plants', plantsController.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plantsController.plant_detail);

// Route to create a new plant
router.post('/plants', plantsController.plant_create_post);

// Route to update a plant by ID
router.put('/plants/:id', plantsController.plant_update_put);

// Route to delete a plant by ID
router.delete('/plants/:id', plantsController.plant_delete);

module.exports = router;
