const mongoose = require('mongoose');

// Define the plant schema
const plantSchema = new mongoose.Schema({
  plant_name: { type: String, required: true },
  plant_type: { type: String, required: true },
  plant_age: { type: Number, required: true }
});

// Create and export the Plant model
module.exports = mongoose.model('Plant', plantSchema);