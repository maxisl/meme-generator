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

/*
TODO USERS DELETE
1. DeleteUser                   (/)
*/

// DELETE USER
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send(`Deleted user: ${user}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
