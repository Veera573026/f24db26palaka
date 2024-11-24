<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET Random Item page. */
router.get('/', function(req, res) {
  res.render('randomitem', { title: 'A Random Item' });
=======
// routes/pick.js
const express = require('express');
const router = express.Router();

// GET route to render the randomitem.pug template
router.get('/', (req, res) => {
    res.render('randomitem', { title: 'A Random Item' });
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
});

module.exports = router;