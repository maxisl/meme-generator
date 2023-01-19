const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // TODO does not work so far, can create multiple users with same email
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
});

// check for unique email
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// hide password in JSON response
userSchema.set("toJSON", {
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.password;
  },
});

module.exports = mongoose.model("User", userSchema);
