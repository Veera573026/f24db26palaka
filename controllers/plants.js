const Plant = require('../models/plants');

// Get all plants
exports.plant_list = async function (req, res) {
  try {
    const plants = await Plant.find(); // Retrieve all plants
    res.render('plants', { plants });  // Ensure this matches the view you want to render
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
};

// Get details of a specific plant
exports.plant_detail = async function (req, res) {
  try {
    const plant = await Plant.findById(req.params.id); // Find a plant by its ID
    if (!plant) {
      return res.status(404).render('error', { message: 'Plant not found' });
    }
    res.render('plantdetail', { title: 'Plant Detail', plant });  // Ensure plantdetail is the correct view
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).render('error', { message: 'Failed to fetch plant details' });
  }
};

// Other controller functions follow the same structure...
