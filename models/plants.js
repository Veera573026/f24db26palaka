const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  plant_name: { type: String, required: true },
  plant_type: { type: String, required: true },
  plant_age: { type: Number, required: true },
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
