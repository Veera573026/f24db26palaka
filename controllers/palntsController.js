const Plant = require('../models/plants');

// List all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Fetch details of a specific plant
exports.plant_detail = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Create a new plant
exports.plant_create_post = async (req, res) => {
  const newPlant = new Plant(req.body);
  try {
    await newPlant.save();
    res.status(201).json({ message: 'Plant created successfully', plant: newPlant });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create plant', error: err.message });
  }
};

// Update an existing plant
exports.plant_update_put = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(updatedPlant);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update plant' });
  }
};

// Delete a plant
exports.plant_delete = async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) return res.status(404).json({ message: 'Plant not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete plant' });
  }
};
