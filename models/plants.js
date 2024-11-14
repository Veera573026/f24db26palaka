const Plant = require('../models/plants');

// Get all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Get details of a specific plant by ID
exports.plant_detail = function(req, res) {
  Plant.findById(req.params.id, function(err, plant) {
    if (err || !plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(plant);
  });
};

// Create a new plant
exports.plant_create_post = async (req, res) => {
  const newPlant = new Plant({
    plant_name: req.body.plant_name,
    plant_type: req.body.plant_type,
    plant_age: req.body.plant_age
  });
  try {
    await newPlant.save();
    res.status(201).json({ message: 'Plant created successfully', plant: newPlant });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create plant', error: err.message });
  }
};

// Delete a plant by ID
exports.plant_delete = function(req, res) {
  Plant.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting plant" });
    res.status(204).send();
  });
};

// Update a plant by ID
exports.plant_update_put = function(req, res) {
  Plant.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedPlant) {
    if (err) return res.status(500).json({ message: "Error updating plant" });
    res.status(200).json(updatedPlant);
  });
};
