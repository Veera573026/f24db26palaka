
const Plant = require('../models/plants');


exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};


exports.plant_detail = function(req, res) {
  Plant.findById(req.params.id, function(err, plant) {
    if (err || !plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(plant);
  });
};


exports.plant_create_post = async (req, res) => {
  const newPlant = new Plant({
    plant_name: req.body.plant_name,
    price: req.body.price,
    functionality: req.body.functionality
  });
  try {
    await newPlant.save();
    res.status(201).json({ message: 'plant created successfully', plant: newplant });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create plant', error: err.message });
  }
};


exports.plant_delete = function(req, res) {
  Plant.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting plant" });
    res.status(204).send();
  });
};


exports.plant_update_put = function(req, res) {
  Plant.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedPlant) {
    if (err) return res.status(500).json({ message: "Error updating plant" });
    res.status(200).json(updatedPlant);
  });
};