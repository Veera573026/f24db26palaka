// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants'); // Corrected path to controllers/plants.js

// Route to render the plants page using the controller function
router.get('/', plantsController.plant_list);

module.exports = router;
