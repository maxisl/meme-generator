const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
TODO USERS AUTH
1. RegisterUser                   (/register)
2. LoginUser                      (/login)
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
// REGISTER NEW USER
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ Error: "Not all required arguments supplied" });
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: hashedPassword,
  });

  user.save((error) => {
    if (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(409).send({ error: "Email already exists" });
      }
      return res.status(422).send(error.errors.email.message);
    } else {
      console.log(user);
      res.status(201).json({
        user: user,
      });
    }
  });
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ Error: "Not all required arguments supplied" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ Error: "Incorrect password or username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ Error: "Incorrect password or username" });
    } else {
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(201).json({
        user,
        token,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
});

module.exports = router;
