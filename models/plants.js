// Create a new plant
exports.plant_create_post = async function (req, res) {
    try {
      const { plant_name, plant_type, plant_age } = req.body;  // Extract data from request body
      if (!plant_name || !plant_type || !plant_age) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newPlant = new Plant({ plant_name, plant_type, plant_age });  // Create a new plant instance
      await newPlant.save();  // Save the new plant to the database
      res.status(201).json(newPlant);  // Return the created plant as JSON response
    } catch (err) {
      console.error('Error during plant creation:', err);
      res.status(500).json({ message: 'Failed to create plant' });
    }
  };
  