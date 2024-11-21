// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Ensure the correct path

// Define your routes
router.get('/', plantsController.plant_list);
router.get('/:id', plantsController.plant_detail);
router.post('/', plantsController.plant_create_post);  // Ensure this is properly defined
router.put('/:id', plantsController.plant_update_put);
router.delete('/:id', plantsController.plant_delete);
router.get('/detail', plantsController.plant_view_one_Page);

module.exports = router;
