var express = require('express');
const potion_controller = require('../controllers/potion');
const detail_controller = require('../controllers/detailController');
var router = express.Router();
 
// GET request to fetch all potions
router.get('/', potion_controller.potion_list);
 
// POST request to create a new potion
router.post('/potions', potion_controller.potion_create_post);


router.get('/detail', detail_controller.potion_view_one_Page);
router.get('/create', detail_controller.potion_create_Page);
router.get('/update', detail_controller.potion_update_Page);
router.get('/delete', detail_controller.potion_delete_Page);

module.exports = router;