var express = require("express");
var router = express.Router();
const Meme = require("../models/meme");
const User = require("../models/user")
const mongoose = require("mongoose");

// change now to current timestamp in the GMT+1 time zone
const now = new Date();
// add 1 hour to get correct timestamp
now.setTime(Date.now() + 1 * 60 * 60 * 1000);

/* TODO GET memes listing. */
/*router.get('/', function(req, res, next) {
  const db = req.db;
  const users = db.get('users');
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => res.json(docs))
      .catch((e) => res.status(500).send())
});*/

/**************************************************************
TODO MEMES GET
1. GetAll                   (/)
2. GetMemeById              (/:id)
3. GetRandomMeme            (/random)
4. GetPreviousMemeForId     (/:id/previous)
5. GetNextMemeById          (/:id/next)
6. GetMemeStatsById         (/:id/stats)
7. GetAllDraftsForUser      (/drafts)       - requires Auth
8. GetFavoriteMemes         (/faves)        - requires Auth
*/

/**
 * @swagger
 * /memes/:
 *   get:
 *     tags:
 *       - memes
 *     summary: Get all memes
 *     description: Returns an array of all memes in the collection
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Meme"
 *       500:
 *         description: Internal Server Error
 */
// GET ALL MEMES
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find();
    res.send(memes);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /memes/random:
 *   get:
 *     tags:
 *       - memes
 *     summary: Get a random meme
 *     description: Returns a random meme in the collection
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Meme'
 *       404:
 *         description: No memes found
 *       500:
 *         description: Internal server error
 */
// GET RANDOM MEME
router.get("/random", async (req, res) => {
  try {
    const randomMeme = await Meme.aggregate([{ $sample: { size: 1 } }]);
    if (!randomMeme) {
      res.status(404).send("No memes found");
    } else {
      res.send(randomMeme[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /memes/{memeId}:
 *   get:
 *     tags:
 *       - memes
 *     summary: Get meme by ID
 *     description: Returns the meme with the specified ID
 *     parameters:
 *       - in: path
 *         name: memeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the meme to retrieve
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Meme"
 *       404:
 *         description: Meme not found
 *       500:
 *         description: Internal Server Error
 */
// GET MEME BY ID
router.get("/:memeId", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.memeId);
    if (!meme) {
      res.status(404).send("Meme not found");
    } else {
      res.send(meme);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**************************************************************
TODO MEMES POST
1. PostMeme             (/file)              - requires Auth
2. LikeMeme             (/:id/like)         - requires Auth? => see notes
3. UnlikeMeme           (/:id/unlike)       - requires Auth
4. PostCommentOnMeme    (/:id/comment)      - requires Auth
5. CreateMemeByConfig    (/config)            - requires Auth
*/

/**
 * @swagger
 * /memes/:
 *   post:
 *     tags:
 *       - memes
 *     summary: Create a new meme
 *     description: Creates a new meme in the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewMeme"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Meme"
 *       500:
 *         description: Internal Server Error
 */
// POST MEME
router.post("/", async (req, res) => {
  // Check if the user exists in the User collection
  const user = await User.findById(req.body.author);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const meme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    author: req.body.author,
    title: req.body.title,
    image: req.body.image,
    tags: req.body.tags,
    comments: req.body.comments,
  });
  try {
    const savedMeme = await meme.save();
    res.send(savedMeme);
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * @swagger
 * /memes/{memeId}/comment:
 *   post:
 *     tags:
 *       - memes
 *     summary: Add a comment to a meme
 *     description: Adds a comment to the specified meme in the collection
 *     parameters:
 *       - in: path
 *         name: memeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the meme to add a comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text of the comment
 *     responses:
 *       200:
 *         description: Successfully added the comment to the meme
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Meme"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Meme not found
 *       500:
 *         description: Internal server error
 */
// POST COMMENT ON MEME
router.post("/:memeId/comment", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.text) {
      res.status(400).send("Comment text is required");
      return;
    }
    // Find meme by id and update comments array
    console.log(req.params.memeId);
    const updatedMeme = await Meme.findByIdAndUpdate(
      req.params.memeId,
      { $push: { comments: { text: req.body.text } } },
      { new: true }
    );
    // Return updated meme
    res.send(updatedMeme);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**************************************************************
TODO MEMES DELETE
1. DeleteMemeById       (/:id)      - requires Auth
 */

/**
 * @swagger
 * /memes/{memeId}:
 *   delete:
 *     tags:
 *       - memes
 *     summary: Delete a meme
 *     description: Deletes the specified meme from the collection
 *     parameters:
 *       - in: path
 *         name: memeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the meme to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the meme
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message indicating the success of the delete operation
 *       500:
 *         description: Internal server error
 */
// DELETE MEME BY ID
router.delete("/:memeId", async (req, res) => {
  try {
    const memeId = req.params.memeId;
    const meme = await Meme.findByIdAndDelete(memeId);
    res.send(`Deleted meme: ${meme}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**************************************************************
TODO PATCH MEMES
1. UpdateMemeById       (/:id)      - requires Auth
 */

/**
 * @swagger
 * /memes/{memeId}:
 *   patch:
 *     tags:
 *       - memes
 *     summary: Update a meme
 *     description: Updates the specified meme in the collection
 *     parameters:
 *       - in: path
 *         name: memeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the meme to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Meme"
 *     responses:
 *       200:
 *         description: Successfully updated the meme
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Meme"
 *       404:
 *         description: Meme not found
 *       500:
 *         description: Internal server error
 */
// UPDATE MEME BY ID
router.patch("/:memeId", async (req, res) => {
  try {
    req.body.updatedAt = now;
    const meme = await Meme.findByIdAndUpdate(req.params.memeId, req.body, {
      new: true,
    });
    if (!meme) {
      res.status(404).send("Meme not found");
    } else {
      res.send(meme);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
