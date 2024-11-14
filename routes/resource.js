// routes/resource.js
var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var plant_controller = require('../controllers/palntsController.js');

// API Route
router.get('/', api_controller.api);

// Gadget Routes
router.get('/plants', plant_controller.plant_list);  
router.post('/plants', plant_controller.plant_create_post);
router.get('/plants/:id', plant_controller.plant_detail); 
router.put('/plants/:id', plant_controller.plant_update_put);
router.delete('/plants/:id', plant_controller.plant_delete);

module.exports = router;