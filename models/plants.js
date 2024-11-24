const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({
  // plants_name: String,
  // type: String,
  // price: Number

  plant_name: {
    type: String,
    required: true
  },
  plant_type: {
    type: String,
    required: true
  },
  plant_age: {
    type: Number
  }
})

module.exports = mongoose.model("plant",
    plantSchema)


