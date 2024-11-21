const express = require('express');
const router = express.Router();
const Plant = require('../models/plants');

// GET all plants and render the plants list page
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.find();  // Fetch all plants from the database
    res.render('plants', { plants });  // Render the 'plants.pug' view with plant data
  } catch (err) {
    console.error('Error fetching plants:', err);  // Log the error
    next(err);  // Pass the error to the error handler
  }
});

module.exports = router;
