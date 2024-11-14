// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Correct path to controller

/* GET plants */
router.get('/', plantsController.plant_view_all_Page);

module.exports = router;
