var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  const db = req.db;
  const users = db.get('users');
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => res.json(docs))
      .catch((e) => res.status(500).send())
});*/

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /index'
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (id === 'fav') {
        res.status(200).json({
            message: "You found the fav one"
        });
    } else {
        res.status(200).json({
            message: "You found user with id: " + id,
        });
    }
})

// TODO Implement Basic Routing (see notes)

module.exports = router;
