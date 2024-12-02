const mongoose = require("mongoose");
 
const plantSchema = mongoose.Schema({
  plant_name: {
    type: String,
    required: [true, "Plant name is required"],
    maxLength: [20, "Plant name must be less than or equal to 20 characters"],
    minLength: [1, "Plant name must have at least 1 character"]
  },
  plant_type: {
    type: String,
    required: [true, "Plant type is required"],
    maxLength: [30, "Plant type must be less than or equal to 30 characters"],
    minLength: [1, "Plant type must have at least 1 character"]
  },
  plant_age: {
    type: Number,
    required: [true, "Plant age is required"],
    min: [1, "Plant age must be at least 1"],
    max: [1000, "Plant age must be less than or equal to 1000"]
  }
});
 
module.exports = mongoose.model("Plant", plantSchema);



