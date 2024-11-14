const express = require('express');
const router = express.Router();
const path = require('path');  // Import the path module
const plants= require('../controllers/plants');  // Use path.join for correct path resolution

// Route to get all plants
router.get('/plants', plants.plant_list);

// Route to get a single plant by ID
router.get('/plants/:id', plants.plant_detail);

// Route to create a new plant
router.post('/plants', plants.plant_create_post);

// Route to update a plant by ID
router.put('/plants/:id', plants.plant_update_put);

// Route to delete a plant by ID
router.delete('/plants/:id', plants.plant_delete);

module.exports = router;
exports.plant_list = async (req, res) => {
    try {
      const plants = await Plant.find();
      res.status(200).json(plants);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch plants' });
    }
  };
  