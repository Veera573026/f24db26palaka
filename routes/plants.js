const express = require('express');
const router = express.Router();

// Sample data for plants
const results = [
  { plant_name: "Cactus", plant_type: "Succulent", plant_age: 5 },
  { plant_name: "Rose", plant_type: "Flower", plant_age: 2 },
  { plant_name: "Oak Tree", plant_type: "Tree", plant_age: 50 }
];

// Route to render the plants page
router.get('/', (req, res) => {
  res.render('plants', { 
    title: 'Plants', 
    results: results  // Passing 'results' to the Pug template
  });
});

module.exports = router;
