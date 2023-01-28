var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const Template = require("../models/template");
const crypto = require("crypto");
import fs from 'fs';

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
  const readstream = GridFsStorage.createReadStream({
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

router.post("/upload", async (req, res) => {
  res.json({ file: req.file });
});

// TODO fix
// POST CREATE TEMPLATE WITH FILE
router.post("/upload/file", upload.single("template"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false });
  }
  const file = req.file;
  // generate a unique 8-byte hexadecimal identifier which is appended to front of file name
  const uniqueIdentifier = crypto.randomBytes(8).toString("hex");
  const fileName = `${uniqueIdentifier}-${file.originalname}`;
  const filePath = path.join(__dirname, "uploads", fileName);

  file.mv(filePath, async (err) => {
    // create a new template instance
    const templateName = req.body.name || req.file.originalname;
    const template = await new Template({
      _id: new mongoose.Types.ObjectId(),
      author: req.body._id,
      // TODO activate as soon as user can be logged in
      // author: req.user._id,
      date: now,
      filename: req.file.originalname,
      name: templateName,
      path: req.file.id,
    })
      .save()
      .then(() => {
        res.json({
          success: true,
          template: template,
        });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  });
});

/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
