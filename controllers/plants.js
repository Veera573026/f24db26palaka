// controllers/plants.js
const Plant = require('../models/plants');  // Correct path to the model

// Show all plants
exports.plant_view_all_Page = async function(req, res) {
  try {
    const plants = await Plant.find();
    res.render('plants', { title: 'Plant Search Results', results: plants });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle Plant create on POST
exports.create_post = async function(req, res) {
  try {
    const plant = new Plant({
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_age: req.body.plant_age
    });
    const result = await plant.save();
    res.status(201).json(result);  // Respond with the newly created plant
  } catch (err) {
    res.status(400).json({ error: err.message });  // Return an error message if something goes wrong
  }
};
