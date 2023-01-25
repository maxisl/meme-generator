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
2. GetById                  (/:id)
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

// GET TEMPLATE BY ID
router.get('/:id', (req, res) => {
  const readstream = gfs.createReadStream({
    _id: req.params.id,
  });

  readstream.on('error', (err) => {
    res.status(404).json({ success: false, message: 'File not found' });
  });

  res.set('Content-Type', 'image/jpeg');
  readstream.pipe(res);
});


/*
TODO TEMPLATES POST
1. CreateTemplateWithFile   (/upload/file)
2. CreateTemplateWithURL    (/upload/url)
*/

// POST CREATE TEMPLATE WITH FILE
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
    author: req.user._id,
    date: now,
    filename: req.file.originalname,
    name: templateName,
    path: fileName,
  }).save();

  const writeStream = gfs.createWriteStream({
    filename: fileName,
    mode: 'w',
    content_type: req.file.mimetype,
  });

  writeStream.on('close', (file) => {
    template.path = file._id;
    template.save();
    res.json({
      success: true,
      templates: [template],
    });
  });

  writeStream.write(req.file.buffer);
  writeStream.end();
});


/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
