var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

/* GET users listing. */
/*router.get('/', function (req, res, next) {
    const db = req.db;
    const users = db.get('users');
    users.find({username: req.username}, {projection: {basicauthtoken: 0}}) // return all user properties, except the basic auth token
        .then((docs) => res.json(docs))
        .catch((e) => res.status(500).send())
});*/
/*
TODO USERS GET
1. GetAll                   (/)
2. GetUserById              (/:id)
3. GetUserMemes             (/memes)
4. GetUserTemplates         (/templates.js)
*/

/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Returns a list of all users in the database
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/User"
 *       500:
 *         description: Server error
 */
// GET ALL USERS
router.get("/", (req, res) => {
  User.find((error, users) => {
    if (error) {
      res.send(error);
    } else {
      res.send(users);
    }
  });
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Invalid id" });
    }
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting user" });
  }
});

/*
TODO USERS POST
1. CreateUser                   (/)
*/

/**
 * @swagger
 * /users/:
 *   post:
 *     tags:
 *       - users
 *     summary: Create a new user
 *     description: Creates a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
// CREATE NEW USER
router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !name) {
    return res.status(400).json({Error: "Not all required arguments supplied"});
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: hashedPassword,
  });

  // TODO hash password

  user.save((error) => {
    if (error) {
      res.send(error);
    } else {
      console.log(user);
      res.status(201).json({
        user : user
      });
    }
  });
});

/*
TODO USERS DELETE
1. DeleteUser                   (/)
*/

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Invalid id" });
    }
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
