const mongoose = require('mongoose');

// Define the schema for plants
const plantSchema = new mongoose.Schema({
  plant_name: { type: String, required: true },
  plant_type: { type: String, required: true },
  plant_age: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model('Plant', plantSchema);
