var express = require("express");
var router = express.Router();
var Template = require("../models/template");
var User = require("../models/user");
const mongoose = require("mongoose");

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

/*
TODO TEMPLATES GET
1. GetAll                   (/)
*/

// GET ALL TEMPLATES
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find()
      .select("-filename")
      .populate("author", "name");
    res.send(templates);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/*
TODO TEMPLATES POST
1. CreateTemplateWithFile   (/upload/file)
2. CreateTemplateWithURL    (/upload/url)
*/
router.post('/upload/file', upload.single('template'), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false });
  }

  const now = new Date();
  const templateName = req.body.name || req.file.originalname;
  const sha = sha256(req.file.originalname + now.toString()).toString();
  const ext = path.extname(req.file.originalname);
  const fileName = sha + ext;
  const template = await new Template({
    uploadedAt: now,
    originalFilename: req.file.originalname,
    name: templateName,
    path: fileName,
    uploadUser: req.user._id,
  }).save();



  writeStream.write(req.file.buffer);
  writeStream.end();
});


/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
