const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({


  plant_name: {
    type: String,
    required: true
  },
  plant_type: {
    type: String,
    required: true
  },
  plant_age: {
    type: Number,
    required: [true, "Plant age is required"], // Custom error message
    min: [1, "Plant age must be at least 1"],  // Added minimum value
    max: [100, "Plant age must be at most 100"], // Added maximum value
  },
})

module.exports = mongoose.model("plant",
    plantSchema)


