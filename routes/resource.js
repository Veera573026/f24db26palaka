const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure this matches the actual path

// Route definitions
router.get('/plants', plantsController.plant_list); // Ensure plant_list is defined
router.get('/plants/:id', plantsController.plant_detail); // Ensure plant_detail is defined
router.post('/plants', plantsController.plant_create_post); // Ensure plant_create_post is defined
router.put('/plants/:id', plantsController.plant_update_put); // Ensure plant_update_put is defined
router.delete('/plants/:id', plantsController.plant_delete); // Ensure plant_delete is defined
router.get('/plants/detail', plantsController.plant_view_one_Page); // Ensure plant_view_one_Page is defined

module.exports = router;
