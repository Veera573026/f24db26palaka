// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Ensure correct path to controller

/* GET plants page (view) */
router.get('/', plantsController.plant_view_all_Page);

module.exports = router;
