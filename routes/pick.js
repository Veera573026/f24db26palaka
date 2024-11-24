var express = require('express');
var router = express.Router();

/* GET Random Item page. */
router.get('/', function(req, res) {
  res.render('randomitem', { title: 'A Random Item' });
});

module.exports = router;