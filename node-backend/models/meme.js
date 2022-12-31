const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const memeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, //  could be of type String, which is used to store a URL or file path to the image. Alternatively, store the image data as a Buffer or Binary data type
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
        default: "unknown",
      },
      date: {
        type: Date,
        default: now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: now,
  },
  updatedAt: {
    type: Date,
    default: now,
  },
});

module.exports = mongoose.model("Meme", memeSchema);
