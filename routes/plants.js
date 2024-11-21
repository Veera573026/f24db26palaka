const express = require('express');
const router = express.Router();
const Plant = require('../models/plants');

// GET all plants and render the page with plant data
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.find();  // Fetches all plants from the database
    res.render('plants', { plants });  // Renders the 'plants' view with plant data
  } catch (err) {
    next(err);  // Passes the error to the error handler
  }
});

module.exports = router;
