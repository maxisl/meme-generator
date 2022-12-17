var express = require('express');
var router = express.Router();

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
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /memes'
    });
});

// GET MEME BY ID
router.get('/:memeId', (req, res, next) => {
    const id = req.params.memeId;
    if (id === 'fav') {
        res.status(200).json({
            message: "You found the fav meme!"
        });
    } else {
        res.status(200).json({
            message: "You found meme with id: " + id,
        });
    }
})

/*
TODO MEMES POST
1. PostMeme             (/file)              - requires Auth
2. LikeMeme             (/:id/like)         - requires Auth? => see notes
3. UnlikeMeme           (/:id/unlike)       - requires Auth
4. PostCommentOnMeme    (/:id/comment)      - requires Auth
5. CreateMemeByConfig    (/config)            - requires Auth
*/

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /memes'
    });
});

/*
TODO DELETE MEMES
1. DeleteMemeById       (/:id)      - requires Auth
 */

router.delete('/:memeId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests to /memes'
    });
});

/*
TODO PATCH MEMES
1. UpdateMemeById       (/:id)      - requires Auth
 */

router.patch('/:memeId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PATCH (update) requests to /memes'
    });
});

module.exports = router;
