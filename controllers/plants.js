// collectors/plants.js
const Plant = require('../models/plants');  // Correct path to the model

// Function to render the plants list page
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();  // Get all plants from the collection
    res.render('plants', { title: 'Plants', results: plants });  // Pass plants to the view
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
    res.status(200).json(plant);  // Respond with the plant details as JSON
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};
