var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Template = require("../models/template");
const ObjectId = mongoose.Types.ObjectId
// const { ObjectId } = require("mongodb");


// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const MONGODB_PORT = process.env.DBPORT || "27017";

const storage = new GridFsStorage({
  url: `mongodb://127.0.0.1:${MONGODB_PORT}/omm-2223`,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "templates",
    };
  },
});

const upload = multer({ storage });

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
router.get("/:id", (req, res) => {
  const readstream = gfs.createReadStream({
    _id: req.params.id,
  });

  readstream.on("error", (err) => {
    res.status(404).json({ success: false, message: "File not found" });
  });

  res.set("Content-Type", "image/jpeg");
  readstream.pipe(res);
});

/*
TODO TEMPLATES POST
1. CreateTemplateWithFile   (/upload/file)
2. CreateTemplateWithURL    (/upload/url)
*/

// POST CREATE TEMPLATE WITH FILE
router.post("/upload/file", upload.single("template"), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false });
  }

  // create a new template instance
  const now = new Date();
  const templateName = req.body.name || req.file.originalname;
  const fileName = new ObjectId() + path.extname(req.file.originalname);
  const template = await new Template({
    author: req.user._id,
    date: now,
    filename: req.file.originalname,
    name: templateName,
    path: fileName,
  }).save();

  // save the file to GridFS
  try {
    const writeStream = gfs.createWriteStream({
      filename: fileName,
      mode: "w",
      content_type: req.file.mimetype,
    });
    // update the path field of the Template instance with the _id of the file saved to GridFS
    writeStream.on("close", (file) => {
      template.path = file._id;
      template.save();
      res.json({
        success: true,
        template: template,
      });
    });
    writeStream.write(req.file.buffer);
    writeStream.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
