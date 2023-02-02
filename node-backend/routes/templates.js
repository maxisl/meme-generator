const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Template = require("../models/template");
const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const mime = require("mime-types");

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination callback with path
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // generate a "unique" name
    let id = nanoid();
    // need to use the file's mimetype because the file name may not have an extension at all
    let ext = mime.extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  },
});

const uploadFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Filetype not accepted"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter,
});

/**************************************************************
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
router.get("/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    if (!template) {
      res.status(404).send("Template not found");
    } else {
      res.send(template);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**************************************************************
 /*
 TEMPLATES POST
 1. CreateTemplateWithFile   (/upload/file)
 2. TODO CreateTemplateWithURL    (/upload/url)
 */

// POST CREATE TEMPLATE WITH FILE
router.post("/", upload.single("template"), async (req, res) => {
  console.log(req.file);
  const originalName = req.file.filename || req.file.originalname;
  const fileName = `${originalName}`;
  const template = await new Template({
    _id: new mongoose.Types.ObjectId(),
    author: req.body._id,
    // TODO activate as soon as user can be logged in
    // author: req.user._id,
    date: now,
    filename: fileName,
    name: req.body.name,
    path: req.file.path,
  });
  template
    .save()
    .then((result) => {
      console.log("Result: " + result);
      res.status(201).json({
        message: "Template created successfully",
        template,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/**************************************************************
 /*
 1. DeleteTemplate           (/:id)
 */

// DELETE ALL TEMPLATES
router.delete("/all", async (req, res) => {
  try {
    await Template.deleteMany({});
    res.send("All templates deleted");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// TODO delete image when template is deleted
// DELETE TEMPLATE BY ID
router.delete("/:templateId", async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const deletedTemplate = await Template.findByIdAndRemove(templateId);
    // const filepath = path.resolve(`uploads/${filename}`);
    // TODO await unlinkAsync(filepath);
    if (!deletedTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }
    res
      .status(200)
      .json({ message: "Template deleted successfully", deletedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
