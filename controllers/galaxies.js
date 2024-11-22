const mongoose = require("mongoose");
const Galaxy = require("../models/galaxies");

// Helper function for validation
const validateGalaxy = (data) => {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    if (!data.year || isNaN(data.year)) errors.push("Year must be a valid number");
    if (!data.inventor) errors.push("Inventor is required");
    if (!data.distance || isNaN(data.distance) || data.distance <= 0) errors.push("Distance must be a positive number");
    if (!data.type) errors.push("Type is required");
    return errors;
};

// List all galaxies (Read all)
exports.galaxy_list = async function (req, res) {
  try {
    const galaxies = await Galaxy.find();
    console.log("Galaxies retrieved:", galaxies); // Debugging statement
    res.render("galaxies", { title: "Galaxy List", results: galaxies });
  } catch (err) {
    console.error("Error retrieving galaxies:", err);
    res.status(500).send(`Error retrieving galaxies: ${err.message}`);
  }
};


// Get details of a specific galaxy (Read one)
exports.galaxy_detail = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        const galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxydetail", { title: "Galaxy Details", toShow: galaxy });
    } catch (err) {
        res.status(500).send(`Error retrieving galaxy: ${err}`);
    }
};

// Create a new galaxy (Create)
exports.galaxy_create_post = async function (req, res) {
    const errors = validateGalaxy(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const galaxy = new Galaxy({
        name: req.body.name,
        year: req.body.year,
        inventor: req.body.inventor,
        distance: req.body.distance,
        type: req.body.type,
    });

    try {
        const result = await galaxy.save();
        res.status(201).json({ message: "Galaxy created successfully", galaxy: result });
    } catch (err) {
        res.status(500).send(`Error creating galaxy: ${err}`);
    }
};

// Update an existing galaxy (Update)
exports.galaxy_update_put = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        let galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }

        galaxy.name = req.body.name || galaxy.name;
        galaxy.year = req.body.year || galaxy.year;
        galaxy.inventor = req.body.inventor || galaxy.inventor;
        galaxy.distance = req.body.distance || galaxy.distance;
        galaxy.type = req.body.type || galaxy.type;

        const updatedGalaxy = await galaxy.save();
        res.json({ message: "Galaxy updated successfully", galaxy: updatedGalaxy });
    } catch (err) {
        res.status(500).send(`Error updating galaxy: ${err}`);
    }
};

// Delete a galaxy (Delete)
exports.galaxy_delete = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        const galaxy = await Galaxy.findByIdAndDelete(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.json({ message: "Galaxy deleted successfully", galaxy });
    } catch (err) {
        res.status(500).send(`Error deleting galaxy: ${err}`);
    }
};
