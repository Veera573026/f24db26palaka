var express = require('express');
var router = express.Router();

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

