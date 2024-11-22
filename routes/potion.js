var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/potion'); // Make sure this path is correct

// Routes
router.get('/', galaxy_controller.galaxy_list); // Should be a valid function from galaxy_controller
router.post('/', galaxy_controller.galaxy_create_post);
router.put('/:id', galaxy_controller.galaxy_update_put);
router.delete('/:id', galaxy_controller.galaxy_delete);
router.get('/:id', galaxy_controller.galaxy_detail);

module.exports = router;
