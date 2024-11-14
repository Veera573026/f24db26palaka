// models/plants.js
const mongoose = require('mongoose');

// Define the plant schema
const plantSchema = new mongoose.Schema({
  plant_name: String,
  plant_type: String,
  plant_age: Number
});

// Export the Plant model based on the schema
module.exports = mongoose.model('Plant', plantSchema);
