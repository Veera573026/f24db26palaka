// routes/plants.js

const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');  // Correct path to controller

/* GET plants */

console.log(plants);
router.get('/', plantController.plant_list);  // Ensure this references the correct controller function
router.post('/', plantController.plant_create_post);
router.put('/:id', plantController.plant_update_put);
router.delete('/:id', plantController.plant_delete);
router.get('/:id', plantController.plant_detail);

module.exports = router;
