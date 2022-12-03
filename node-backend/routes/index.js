var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // look in the views folder for a file that has the name of index before the extension
  res.render('index', { title: 'Express' });
});

module.exports = router;
