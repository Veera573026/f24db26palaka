var Potion = require('../models/potion');  // Import the Potion model

// List all potions
exports.potion_list = async function(req, res) {
    try {
        // Fetch all potions from the database
        const allPotions = await Potion.find();  

        // Send the list of potions as a JSON response
        // res.json(allPotions);
        res.render('potion', { title: 'Potion Search Results', results: allPotions }); 
        
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);  
    }
};

// For a specific potion
exports.potion_detail = async function(req, res) {
    try {
        // Find the potion by id
        const potion = await Potion.findById(req.params.id);

        if (!potion) {
            return res.status(404).send('Potion not found');
        }

        // Send the potion details as a JSON response
        res.json(potion);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle potion creation on POST
exports.potion_create_post = async function(req, res) {
    try {
        // Create a new potion using the data in the request body
        const newPotion = new Potion({
            name: req.body.name,
            effect: req.body.effect,
            potency: req.body.potency
        });

        // Save the new potion to the database
        await newPotion.save();

        // Send the newly created potion as a JSON response
        res.status(201).json(newPotion);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle potion deletion on DELETE
exports.potion_delete = async function(req, res) {
    try {
        result = await Potion.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result) 
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle potion update on PUT
exports.potion_update_put = async function(req, res) {
    try {
        // Find the potion by id and update it with the new data from the request body
        const updatedPotion = await Potion.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type: req.body.type,
            effect: req.body.effect,
            ingredients: req.body.ingredients,
        }, { new: true });

        if (!updatedPotion) {
            return res.status(404).send('Potion not found');
        }

        // Send the updated potion as a JSON response
        res.json(updatedPotion);  
    } catch (err) {
        // If an error occurs, return status 500 with the error message
        res.status(500).send(`{"error": ${err}}`);
    }
};