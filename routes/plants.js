const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants');

// Routes
router.get('/', plantsController.plant_list);
router.get('/detail', plantsController.plant_view_one_Page);
router.get('/:id', plantsController.plant_detail);
router.post('/', plantsController.plant_create_post);
router.put('/:id', plantsController.plant_update_put);
router.delete('/:id', plantsController.plant_delete);

module.exports = router;
