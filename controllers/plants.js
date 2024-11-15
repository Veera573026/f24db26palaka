const Plant = require('../models/plants');  // Ensure correct path to model

// Function to fetch all plants
exports.plant_list = async function(req, res) {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};
// Function to delete a plant by ID
exports.plant_delete = async function(req, res) {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json({ message: 'Plant successfully deleted' });
  } catch (err) {
    console.error('Error during plant deletion:', err);
    res.status(500).json({ message: 'Failed to delete plant' });
  }
};

// Function to fetch details of a specific plant
exports.plant_detail = async function(req, res) {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Function to create a new plant (POST request)
exports.plant_create_post = async function(req, res) {
  try {
    if (!req.body.plant_name || !req.body.plant_type || !req.body.plant_age) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newPlant = new Plant({
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_age: req.body.plant_age
    });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    console.error('Error during plant creation:', err);
    res.status(500).json({ message: 'Failed to create plant' });
  }
};

// Function to update an existing plant (PUT request)
exports.plant_update_put = async function (req, res) {
  console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
      // Find the plant by ID
      let toUpdate = await Plant.findById(req.params.id);

      // Update properties if they are defined in the request body
      if (req.body.plant_name) toUpdate.plant_name = req.body.plant_name;
      if (req.body.plant_type) toUpdate.plant_type = req.body.plant_type;
      if (req.body.plant_age) toUpdate.plant_age = req.body.plant_age;

      // Save the updated document
      let result = await toUpdate.save();
      console.log("Success " + result);
      res.send(result);
  } catch (err) {
      res.status(500);
      res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
  }
};

