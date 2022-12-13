var express = require('express');
var router = express.Router();

/* TODO define swagger schemas
   https://www.youtube.com/watch?v=S8kmHtQeflo */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "It works"
  });
  // look in the views folder for a file that has the name of index before the extension
  // res.render('index', { title: 'Express' });
});

module.exports = router;
