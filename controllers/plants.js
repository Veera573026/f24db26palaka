const Plant = require('../models/plants');

// Get all plants
exports.plant_list = async function (req, res) {
  try {
    const plants = await Plant.find();  // Retrieve all plants
    res.status(200).json(plants);  // Send the list as a JSON response
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Get details of a specific plant by ID
exports.plant_detail = async function (req, res) {
  try {
    const plant = await Plant.findById(req.params.id);  // Find a plant by its ID
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);  // Send the plant details as a JSON response
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).json({ message: 'Failed to fetch plant details' });
  }
};

// Create a new plant
exports.plant_create_post = async function (req, res) {
  try {
    const { plant_name, plant_type, plant_age } = req.body;  // Extract data from the request body
    if (!plant_name || !plant_type || !plant_age) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPlant = new Plant({ plant_name, plant_type, plant_age });  // Create a new plant instance
    await newPlant.save();  // Save the plant to the database
    res.status(201).json(newPlant);  // Send the created plant as a JSON response
  } catch (err) {
    console.error('Error during plant creation:', err);
    res.status(500).json({ message: 'Failed to create plant' });
  }
};

// Update an existing plant
exports.plant_update_put = async function (req, res) {
  try {
    const plant = await Plant.findById(req.params.id);  // Find the plant by ID
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    const { plant_name, plant_type, plant_age } = req.body;
    if (plant_name) plant.plant_name = plant_name;
    if (plant_type) plant.plant_type = plant_type;
    if (plant_age) plant.plant_age = plant_age;

    const updatedPlant = await plant.save();  // Save the updated plant
    res.status(200).json(updatedPlant);  // Send the updated plant as a JSON response
  } catch (err) {
    console.error('Error updating plant:', err);
    res.status(500).json({ message: 'Failed to update plant' });
  }
};

// Delete a plant by ID
exports.plant_delete = async function (req, res) {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);  // Delete the plant by ID
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json({ message: 'Plant successfully deleted' });  // Send a success message
  } catch (err) {
    console.error('Error deleting plant:', err);
    res.status(500).json({ message: 'Failed to delete plant' });
  }
};

// Handle a single view with ID specified by query
exports.plant_view_one_Page = async function (req, res) {
  console.log("Single view for ID: " + req.query.id);
  try {
    const result = await Plant.findById(req.query.id);  // Find the plant by ID
    if (!result) {
      return res.status(404).send(`{'error': 'No plant found with ID ${req.query.id}'}`);
    }
    res.render('plantdetail', { title: 'Plant Detail', toShow: result });  // Render the plant detail view
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};
