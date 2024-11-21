// controllers/plants.js
const Plant = require('../models/plants');

// Get all plants
exports.plant_list = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.render('plants', { plants });
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).send('Failed to fetch plants');
  }
};

// Get details of a specific plant
exports.plant_detail = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send('Plant not found');
    }
    res.render('plantdetail', { plant });
  } catch (err) {
    console.error('Error fetching plant:', err);
    res.status(500).send('Failed to fetch plant');
  }
};

// View one plant page by query ID
exports.plant_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    const result = await Plant.findById(req.query.id);
    res.render('plantdetail', {
      title: 'Plant Detail', toShow: result
    });
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// Create a new plant
exports.plant_create_post = async (req, res) => {
  try {
    const { plant_name, plant_type, plant_age } = req.body;
    if (!plant_name || !plant_type || !plant_age) {
      return res.status(400).send('Missing required fields');
    }
    const newPlant = new Plant({ plant_name, plant_type, plant_age });
    await newPlant.save();
    res.status(201).send('Plant created successfully');
  } catch (err) {
    console.error('Error during plant creation:', err);
    res.status(500).send('Failed to create plant');
  }
};

// Update a plant
exports.plant_update_put = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send('Plant not found');
    }

    const { plant_name, plant_type, plant_age } = req.body;
    if (plant_name) plant.plant_name = plant_name;
    if (plant_type) plant.plant_type = plant_type;
    if (plant_age) plant.plant_age = plant_age;

    const updatedPlant = await plant.save();
    res.status(200).send(updatedPlant);
  } catch (err) {
    console.error('Error updating plant:', err);
    res.status(500).send('Failed to update plant');
  }
};

// Delete a plant
exports.plant_delete = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).send('Plant not found');
    }
    res.status(200).send('Plant deleted successfully');
  } catch (err) {
    console.error('Error deleting plant:', err);
    res.status(500).send('Failed to delete plant');
  }
};
