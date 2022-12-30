var express = require("express");
var router = express.Router();

/* TODO define swagger schemas
   https://www.youtube.com/watch?v=S8kmHtQeflo */

/* GET home page. */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Handling GET requests to /index",
  });
});

module.exports = router;
