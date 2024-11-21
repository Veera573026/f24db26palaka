const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Make sure this path is correct

// GET all plants and render the plants list page
router.get('/', plantsController.plant_list);

// GET details of a specific plant by ID
router.get('/:id', plantsController.plant_detail);

// POST to create a plant
router.post('/', plantsController.plant_create_post);  // Ensure plant_create_post is properly defined in the controller

// PUT to update an existing plant
router.put('/:id', plantsController.plant_update_put);

// DELETE a plant by ID
router.delete('/:id', plantsController.plant_delete);

// GET a plant by query ID for viewing a single plant page
router.get('/detail', plantsController.plant_view_one_Page);

module.exports = router;
