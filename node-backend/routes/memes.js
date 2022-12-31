var express = require("express");
var router = express.Router();
const Meme = require("../models/meme");
const User = require("../models/user");
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

/*
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

// GET ALL MEMES
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find();
    res.send(memes);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

/*
TODO MEMES POST
1. PostMeme             (/file)              - requires Auth
2. LikeMeme             (/:id/like)         - requires Auth? => see notes
3. UnlikeMeme           (/:id/unlike)       - requires Auth
4. PostCommentOnMeme    (/:id/comment)      - requires Auth
5. CreateMemeByConfig    (/config)            - requires Auth
*/

router.post("/", async (req, res) => {
  const meme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    image: req.body.image,
    tags: req.body.tags,
    likes: req.body.likes,
    comments: req.body.comments,
  });
  try {
    const savedMeme = await meme.save();
    res.send(savedMeme);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
TODO MEMES DELETE
1. DeleteMemeById       (/:id)      - requires Auth
 */

router.delete("/:memeId", async (req, res) => {
  try {
    const memeId = req.params.memeId;
    const meme = await Meme.findByIdAndDelete(memeId);
    res.send(`Deleted user: ${meme}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
TODO PATCH MEMES
1. UpdateMemeById       (/:id)      - requires Auth
 */

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
