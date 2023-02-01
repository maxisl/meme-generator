import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Template from "../models/template";
import path from "path";
import { nanoid } from "nanoid";

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

/*router.post("/upload", async (req, res) => {
  res.json({ file: req.file });
});*/

// TODO fix
// POST CREATE TEMPLATE WITH FILE
/*
router.post("/upload/file", upload.single("template"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false });
  }
  const file = req.file;

  const filePath = path.join(__dirname, "uploads", fileName);

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

/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
