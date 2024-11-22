const Potion = require('../models/potion'); // Assuming you have a Potion model

// Controller functions
const galaxy_list = async (req, res) => {
    try {
        const potions = await Potion.find();
        res.json(potions); // Or res.render if you're rendering views
    } catch (error) {
        res.status(500).send(error);
    }
};

const galaxy_create_post = async (req, res) => {
    try {
        const newPotion = new Potion(req.body);
        await newPotion.save();
        res.status(201).json(newPotion);
    } catch (error) {
        res.status(500).send(error);
    }
};

const galaxy_update_put = async (req, res) => {
    try {
        const updatedPotion = await Potion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPotion) {
            return res.status(404).send("Potion not found");
        }
        res.json(updatedPotion);
    } catch (error) {
        res.status(500).send(error);
    }
};

const galaxy_delete = async (req, res) => {
    try {
        const deletedPotion = await Potion.findByIdAndDelete(req.params.id);
        if (!deletedPotion) {
            return res.status(404).send("Potion not found");
        }
        res.status(200).send("Potion deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
};

const galaxy_detail = async (req, res) => {
    try {
        const potion = await Potion.findById(req.params.id);
        if (!potion) {
            return res.status(404).send("Potion not found");
        }
        res.json(potion);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Export functions
module.exports = {
    galaxy_list,
    galaxy_create_post,
    galaxy_update_put,
    galaxy_delete,
    galaxy_detail,
};
