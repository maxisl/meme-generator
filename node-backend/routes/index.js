var express = require("express");
var router = express.Router();

/* TODO define swagger schemas
   https://www.youtube.com/watch?v=S8kmHtQeflo */

// TODO add more routes https://www.youtube.com/watch?v=FV1Ugv1Temg&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=3

/* GET home page. */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /index",
  });
});

module.exports = router;
