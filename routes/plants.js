const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Ensure the correct path to the controller

// Route to view details of one plant
router.get('/detail', plantsController.plant_view_one_Page);

module.exports = router;
