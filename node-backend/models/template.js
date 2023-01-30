const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const templateSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: now,
    required: true,
  },
  filename: {
    type: String,
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
});

module.exports = mongoose.model("Template", templateSchema);
