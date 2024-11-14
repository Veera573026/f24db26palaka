// routes/resource.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Correct path to the controller

// Route to get all plants (renders a view)
router.get('/plants', plantsController.plant_view_all_Page);

// Route to create a new plant (API endpoint)
router.post('/plants', plantsController.create_post);

module.exports = router;
