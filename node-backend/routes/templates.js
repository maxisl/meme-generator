var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

/*
TODO TEMPLATES GET
1. GetAll                   (/)
*/

/*
TODO TEMPLATES POST
1. CreateTemplateWithFile   (/upload/file)
2. CreateTemplateWithURL    (/upload/url)
*/

/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
