
var express = require('express');
var plant_controlers = require('../controllers/plants');
var router = express.Router();

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
 
/* GET plants page. */
router.get('/', plant_controlers.plant_view_all_Page);
 
//router.get('/plants/:id', plant_controlers.plant_detail);
router.get('/plants/:id', plant_controlers.plant_detail);

 
// POST route for creating a new plant
router.post('/', plant_controlers.plant_create_post);
router.put('/:id', plant_controlers.plant_update_put);
 
router.delete('/:id', plant_controlers.plant_delete); 


/* GET detail costume page */
router.get('/detail', plant_controlers.plant_view_one_Page);

router.get('/create', secured, plant_controlers.plant_create_Page);

/* GET update costume page */
router.get('/update', secured, plant_controlers.plant_update_Page);

/* GET delete costume page */
router.get('/delete', secured, plant_controlers.plant_delete_Page);


module.exports = router;