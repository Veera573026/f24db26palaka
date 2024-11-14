// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');

// Route to display all plants (for views, not APIs)
router.get('/', plantsController.plant_view_all_Page);

module.exports = router;
