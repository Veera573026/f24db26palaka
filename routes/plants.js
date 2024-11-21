
// GET all plants and render the page with plant data
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure correct path to the controller

// Route definitions
router.get('/plants', plantsController.plant_list); // Get all plants
router.get('/plants/:id', plantsController.plant_detail); // Get a single plant by ID
router.post('/plants', plantsController.plant_create_post); // Create a plant
router.put('/plants/:id', plantsController.plant_update_put); // Update a plant by ID
router.delete('/plants/:id', plantsController.plant_delete); // Delete a plant by ID
router.get('/plants/detail', plantsController.plant_view_one_Page); // View a single plant by query ID
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.find();  // Fetches all plants from the database
    res.render('plants', { plants });  // Renders the 'plants' view with plant data
  } catch (err) {
    next(err);  // Passes the error to the error handler
  }
});

// GET details of a specific plant by ID
router.get('/detail/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);  // Fetches a specific plant by ID
    if (!plant) {
      return res.status(404).send('Plant not found');
    }
    res.render('plantDetail', { plant });  // Renders the 'plantDetail' view with the plant data
  } catch (err) {
    next(err);  // Passes the error to the error handler
  }
});
module.exports = router;


module.exports = router;
