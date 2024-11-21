// controllers/plants.js
const Plant = require('../models/plants');

// Create a new plant
exports.plant_create_post = async function (req, res) {
  try {
    const { plant_name, plant_type, plant_age } = req.body;
    if (!plant_name || !plant_type || !plant_age) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPlant = new Plant({ plant_name, plant_type, plant_age });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    console.error('Error during plant creation:', err);
    res.status(500).json({ message: 'Failed to create plant' });
  }
};

// Make sure to export all your controllers at the end
exports.plant_list = async function (req, res) {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

exports.plant_detail = async function (req, res) {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Continue other controller exports...
