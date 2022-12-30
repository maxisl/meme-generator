var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

/* GET users listing. */
/*router.get('/', function (req, res, next) {
    const db = req.db;
    const users = db.get('users');
    users.find({username: req.username}, {projection: {basicauthtoken: 0}}) // return all user properties, except the basic auth token
        .then((docs) => res.json(docs))
        .catch((e) => res.status(500).send())
});*/

router.get("/", (req, res) => {
  User.find((error, users) => {
    if (error) {
      res.send(error);
    } else {
      res.send(users);
    }
  });
});

router.post("/", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((error) => {
    if (error) {
      res.send(error);
    } else {
      console.log(user);
      res.status(201).json({
        message: "User created",
      });
    }
  });
});

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send(`Deleted user: ${user}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

// TODO Implement Basic Routing (see notes)

module.exports = router;
