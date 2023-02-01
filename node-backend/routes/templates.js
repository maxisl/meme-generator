const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Template = require("../models/template");
const path = require("path");
const { nanoid } = require("nanoid");
const Meme = require("../models/meme");

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination callback with path
    cb(null, "./uploads/");
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
    const template = await Meme.findById(req.params.templateId);
    if (!meme) {
      res.status(404).send("Meme not found");
    } else {
      res.send(meme);
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

router.post("/", upload.single("template"), async (req, res) => {
  console.log(req.file);
  const originalName = req.file.filename || req.file.originalname;
  const fileId = nanoid();
  const ending = path.extname(req.file.originalname) || ".jpg";
  const fileName = `${originalName}${fileId}${ending}`;
  const filePath = path.join(
    "uploads/templates",
    `${now.getFullYear()}-${now.getMonth() + 1}`,
    fileName
  );
  const template = await new Template({
    _id: new mongoose.Types.ObjectId(),
    author: req.body._id,
    // TODO activate as soon as user can be logged in
    // author: req.user._id,
    date: now,
    filename: fileName,
    name: req.body.name,
    path: filePath,
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

// DELETE TEMPLATE BY ID
router.delete("/:templateId", async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const deletedTemplate = await Template.findByIdAndRemove(templateId);
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
