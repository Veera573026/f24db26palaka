const Plant = require('../models/plants');  // Ensure the model path is correct

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

// Function to create a new plant
exports.plant_create_post = async (req, res) => {
  const newPlant = new Plant({
    plant_name: req.body.plant_name,
    plant_type: req.body.plant_type,
    plant_age: req.body.plant_age
  });
  try {
    await newPlant.save();  // Save the new plant to the database
    res.status(201).json({ message: 'Plant created successfully', plant: newPlant });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create plant', error: err.message });
  }
};

// Function to update a plant by ID
exports.plant_update_put = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(updatedPlant);  // Respond with the updated plant
  } catch (err) {
    res.status(500).json({ message: 'Failed to update plant', error: err.message });
  }
};

// Function to delete a plant by ID
exports.plant_delete = async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(204).send();  // Send no content status after successful deletion
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete plant', error: err.message });
  }
};
