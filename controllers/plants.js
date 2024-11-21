// controllers/plants.js
const Plant = require('../models/plants');  // Ensure the correct path to the model

// Get all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.render('plants', { plants });  // Render plants to HTML
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).send('Failed to fetch plants');
  }
};

// Get details of a specific plant
exports.plant_detail = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);  // Find plant by ID
    if (!plant) {
      return res.status(404).send('Plant not found');
    }
    res.render('plantdetail', { plant });  // Render the specific plant detail page
  } catch (err) {
    console.error('Error fetching plant:', err);
    res.status(500).send('Failed to fetch plant');
  }
};

// Create a new plant
exports.plant_create_post = async (req, res) => {
  try {
    const { plant_name, plant_type, plant_age } = req.body;  // Get data from the request body
    if (!plant_name || !plant_type || !plant_age) {
      return res.status(400).send('Missing required fields');
    }

    const newPlant = new Plant({ plant_name, plant_type, plant_age });  // Create a new plant instance
    await newPlant.save();  // Save the new plant to the database
    res.status(201).send('Plant created successfully');  // Send success message
  } catch (err) {
    console.error('Error during plant creation:', err);
    res.status(500).send('Failed to create plant');
  }
};
