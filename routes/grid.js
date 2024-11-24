var express = require('express');
var router = express.Router();

/* GET Grid page.*/
router.get('/', function(req, res) {
    const rows = parseInt(req.query.rows, 10);
    const cols = parseInt(req.query.cols, 10);
    
    // console.log(`rows ${query.rows}`)
    // console.log(`cols ${query.cols}`)

//   res.render('grid', { title: "Grid Display", query: query });
  res.render('grid', { query: { rows, cols } });
});

module.exports = router;