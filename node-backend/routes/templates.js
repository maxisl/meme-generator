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
router.post("/upload/file", async (req, res) => {
  try {
    const { author, filename, name } = req.body;
    if (!author || !filename || !name) {
      return res
        .status(400)
        .send({ error: "Author, filename, and name are required" });
    }
    User.findById(author);
    if (!author) {
      return res.status(404).send({ error: "Author not found" });
    }
    const template = new Template({
      _id: new mongoose.Types.ObjectId(),
      author,
      filename,
      name,
    });
    await template.save();
    res.send({ message: "Template created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/*
TODO TEMPLATES DELETE
1. DeleteTemplate           (/:id)
*/

module.exports = router;
