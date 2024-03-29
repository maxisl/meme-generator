const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const memeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
  //
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  likes: [
    {
      liked_by: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      commentAuthor: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
      date: {
        type: Date,
        default: now,
      },
    },
  ],
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: now,
  },
  updatedAt: {
    type: Date,
    default: now,
  },
  template: {
    ref: "Template",
    type: mongoose.Schema.Types.ObjectId,
  },
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
});

module.exports = mongoose.model("Meme", memeSchema);
