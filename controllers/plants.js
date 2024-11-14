const Plant = require('../models/plants');  // Make sure the model path is correct

// Function to fetch all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();  // Get all plants from the collection
    res.status(200).json(plants);  // Respond with the plants as JSON
  } catch (err) {
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
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};
