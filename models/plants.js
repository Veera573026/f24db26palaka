// models/plants.js
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  plant_name: String,
  plant_type: String,
  plant_age: Number
});

module.exports = mongoose.model('Plant', plantSchema);
