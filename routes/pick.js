const express = require('express');
const router = express.Router();  // Create a new router

// Route for random item
router.get('/randomitem', (req, res) => {
  res.render('randomitem', {
    image_names: [
      'img1.jpeg',
      'img2.png',
      'img3.webp',
      'img4.jpg',
      'img5.jpeg'
    ]
  });
});

module.exports = router;  // Export the router for use in app.js

      
   

      
