const express = require('express');
const router = express.Router();
const plants = require('../controllers/plants');  // Ensure the path to plants controller is correct

// Route to get all plants
router.get('/plants', plants.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plants.plant_detail);

// Route to create a new plant
router.post('/plants', plants.plant_create_post);

// Route to update a plant by ID
router.put('/plants/:id', plants.plant_update_put);

// Route to delete a plant by ID
router.delete('/plants/:id', plants.plant_delete);

module.exports = router;
