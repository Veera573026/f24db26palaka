// controllers/plants.js

const Plant = require('../models/plants');  // Ensure this import is correct

// Function to fetch all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();  // Get all plants from the collection
    if (plants.length === 0) {
      return res.status(404).json({ message: 'No plants found' });  // Handle case if no plants found
    }
    res.status(200).json(plants);  // Respond with the plants as JSON
  } catch (err) {
    console.error('Error fetching plants:', err);  // Log the error for better debugging
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Function to fetch details of a specific plant
exports.plant_detail = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);  // Fetch plant by ID
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(plant);  // Respond with the plant details
  } catch (err) {
    console.error('Error fetching plant details:', err);  // Log error
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Add the create_post function
exports.plant_create_post = async (req, res) => {
  try {
    const newPlant = new Plant({
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_age: req.body.plant_age
    });

    await newPlant.save();  // Save new plant to the database
    res.status(201).json(newPlant);  // Respond with the created plant
  } catch (err) {
    console.error('Error creating plant:', err);  // Log the error
    res.status(500).json({ message: 'Failed to create plant' });
  }
};
