import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

const memeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    type: String,     // TODO dynamically link user with ref: 'User'
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Meme", memeSchema);