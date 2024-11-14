// controllers/plants.js

const Plant = require('../models/plants');  // Ensure this import is correct

// Function to fetch all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();  // Get all plants from the collection
    res.status(200).json(plants);  // Respond with the plants as JSON
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};
// controllers/plants.js



// Function to delete a plant by ID
exports.plant_delete = async (req, res) => {
  try {
    const plantId = req.params.id;  // Get the plant ID from the URL parameter
    if (!plantId) {
      return res.status(400).json({ message: 'Plant ID is required' });
    }

    const plant = await Plant.findByIdAndDelete(plantId);  // Delete the plant by ID

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });  // If no plant was found
    }

    res.status(200).json({ message: 'Plant successfully deleted' });  // Successfully deleted
  } catch (err) {
    console.error('Error while deleting plant:', err);  // Log the error for debugging
    res.status(500).json({ message: 'Failed to delete plant', error: err.message });
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
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Function to create a new plant (POST request)
exports.plant_create_post = async (req, res) => {
  try {
    const newPlant = new Plant({
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_age: req.body.plant_age
    });

    await newPlant.save(); // Attempt to save the new plant to the database
    res.status(201).json(newPlant);  // Return the created plant as a response
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ message: 'Failed to create plant' });  // Return the error to the client
  }
};

// Function to update an existing plant (PUT request)
exports.plant_update_put = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      {
        plant_name: req.body.plant_name,
        plant_type: req.body.plant_type,
        plant_age: req.body.plant_age
      },
      { new: true }  // Return the updated document
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(updatedPlant);  // Respond with the updated plant
  } catch (err) {
    res.status(500).json({ message: 'Failed to update plant' });
  }
};
