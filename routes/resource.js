var express = require('express');
var router = express.Router();

<<<<<<< HEAD
// Require controller modules.
var api_controller = require('../controllers/api');
var plant_controller = require('../controllers/plants');


/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// plant ROUTES ///
// POST request for creating a plant
router.post('/plants', plant_controller.plant_create_post);
// DELETE request to delete plant
router.delete('/plants/:id', plant_controller.plant_delete);
// PUT request to update plant
router.put('/plants/:id', plant_controller.plant_update_put);
// GET request for one plant
router.get('/plants/:id', plant_controller.plant_detail);
// GET request for list of all plants
router.get('/plants', plant_controller.plant_list);

module.exports = router;

=======
var api_controller = require('../controllers/api');
var galaxy_controller = require('../controllers/galaxies');

// Root route for API documentation or overview
router.get('/', api_controller.api);

// Create a new galaxy
router.post('/galaxies', galaxy_controller.galaxy_create_post);

// Delete a galaxy by ID
router.delete('/galaxies/:id', galaxy_controller.galaxy_delete);

// Update a galaxy by ID
router.put('/galaxies/:id', galaxy_controller.galaxy_update_put);

// Get details of a specific galaxy by ID
router.get('/galaxies/:id', galaxy_controller.galaxy_detail);

// Get a list of all galaxies
router.get('/galaxies', galaxy_controller.galaxy_list);

module.exports = router;
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
