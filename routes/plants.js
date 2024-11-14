// routes/plants.js
const express = require('express');
const router = express.Router();
const plantsController = require('../collectors/plants'); // Adjust path as needed

// Route to render the plants page using the controller function
router.get('/', plantsController.plant_list);

module.exports = router;
