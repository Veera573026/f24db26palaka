const mongoose = require('mongoose');

// Define the schema for the Plant model
const plantSchema = new mongoose.Schema({
  plant_name: { type: String, required: true },
  plant_type: { type: String, required: true },
  plant_age: { type: Number, required: true }
});

// Create the Plant model using the schema
const Plant = mongoose.model('Plant', plantSchema);

// Export the Plant model to be used elsewhere
module.exports = Plant;
