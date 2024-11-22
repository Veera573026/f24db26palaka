const mongoose = require("mongoose");

const galaxySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Galaxy name is required"],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, "Year is required"],
        min: [1900, "Year must be later than 1900"],
        max: [new Date().getFullYear(), "Year must not be in the future"],
    },
    inventor: {
        type: String,
        required: [true, "Inventor is required"],
        trim: true,
    },
    distance: {
        type: Number,
        required: [true, "Distance is required"],
        min: [0, "Distance must be a positive number"],
    },
    type: {
        type: String,
        required: [true, "Type of galaxy is required"],
        enum: ["Spiral", "Elliptical", "Irregular", "Lenticular"],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Galaxy", galaxySchema);
