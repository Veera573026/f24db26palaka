const express = require('express');
const router = express.Router();
const Plant = require('../models/plants');

// GET all plants
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.find();  // Fetches all plants from the database
    res.json(plants);  // Sends the plants as a JSON response
  } catch (err) {
    next(err);  // Passes the error to the error handler
  }
});

// GET a specific plant by id
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);  // Fetches a single plant by ID
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);  // Sends the single plant as a JSON response
  } catch (err) {
    next(err);  // Passes the error to the error handler
  }
});

module.exports = router;
