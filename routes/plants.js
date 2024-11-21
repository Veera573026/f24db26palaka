const express = require('express');
const router = express.Router();
const Plant = require('../models/plants');

// GET all plants and render the plants list page
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.find();  // Fetch all plants from the database
    res.render('plants', { plants });  // Render the 'plants.pug' view with plant data
  } catch (err) {
    next(err);  // Pass the error to the error handler
  }
});

// GET details of a specific plant by ID
router.get('/detail/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);  // Find a specific plant by ID
    if (!plant) {
      return res.status(404).send('Plant not found');  // If plant not found, return 404
    }
    res.render('plantDetail', { plant });  // Render 'plantDetail.pug' view with plant data
  } catch (err) {
    next(err);  // Pass the error to the error handler
  }
});

module.exports = router;
