const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meme", memeSchema);
