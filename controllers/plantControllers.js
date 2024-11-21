const Costume = require('../models/costume'); // Ensure the model is correctly imported

exports.costume_create_post = async (req, res) => {
  try {
    const { costume_type, size, cost } = req.body;

    // Validate input
    if (!costume_type || !size || !cost) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new costume
    const newCostume = new Costume({ costume_type, size, cost });
    await newCostume.save();
    res.status(201).json({ message: 'Costume created successfully', costume: newCostume });
  } catch (err) {
    console.error('Error creating costume:', err);
    res.status(500).json({ error: 'Failed to create costume' });
  }
};
