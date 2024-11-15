const Plant = require('../models/plants');  // Ensure correct path to model

// Function to fetch all plants
exports.plant_list = async function(req, res) {
  try {
    console.log('Fetching all plants...');
    const plants = await Plant.find();  // Get all plants from the collection
    console.log('Plants found:', plants);  // Log the plants found
    res.status(200).json(plants);  // Respond with the plants as JSON
  } catch (err) {
    console.error('Error fetching plants:', err);  // Log error for debugging
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Function to delete a plant by ID
exports.plant_delete = async function(req, res) {
  try {
    const plantId = req.params.id;  // Get the plant ID from the URL parameter
    if (!plantId) {
      return res.status(400).json({ message: 'Plant ID is required' });
    }

    const plant = await Plant.findByIdAndDelete(plantId);  // Delete the plant by ID

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json({ message: 'Plant successfully deleted' });
  } catch (err) {
    console.error('Error while deleting plant:', err);
    res.status(500).json({ message: 'Failed to delete plant', error: err.message });
  }
};

// Function to fetch details of a specific plant
exports.plant_detail = async function(req, res) {
  try {
    const plant = await Plant.findById(req.params.id);  // Fetch plant by ID
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(plant);  // Respond with the plant details
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).json({ message: 'Failed to fetch plant details', error: err.message });
  }
};

// Function to create a new plant (POST request)
exports.plant_create_post = async function(req, res) {
  try {
    console.log('Request body:', req.body);  // Log the incoming data

    // Check if required fields are provided
    if (!req.body.plant_name || !req.body.plant_type || !req.body.plant_age) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPlant = new Plant({
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_age: req.body.plant_age
    });

    await newPlant.save();  // Save to MongoDB
    res.status(201).json(newPlant);  // Send back the newly created plant
  } catch (err) {
    console.error("Error during plant creation:", err);
    res.status(500).json({
      message: 'Failed to create plant',
      error: err.message,
    });
  }
};

// Function to update an existing plant (PUT request)
exports.plant_update_put = async function(req, res) {
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
    console.error('Error during plant update:', err);
    res.status(500).json({ message: 'Failed to update plant', error: err.message });
  }
};
