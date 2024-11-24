var express = require('express');
var router = express.Router();

<<<<<<< HEAD
/* GET Grid page.*/
router.get('/', function(req, res) {
    const rows = parseInt(req.query.rows, 10);
    const cols = parseInt(req.query.cols, 10);
    
    // console.log(`rows ${query.rows}`)
    // console.log(`cols ${query.cols}`)

//   res.render('grid', { title: "Grid Display", query: query });
  res.render('grid', { query: { rows, cols } });
=======
router.get('/', function(req, res) {
    let query = req.query;
    console.log(`rows ${query.rows}`);
    console.log(`cols ${query.cols}`);
    res.render('grid', { title: "Grid Display", query: query });
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
});

module.exports = router;