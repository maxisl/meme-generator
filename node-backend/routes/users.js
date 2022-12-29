var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* GET users listing. */
/*router.get('/', function (req, res, next) {
    const db = req.db;
    const users = db.get('users');
    users.find({username: req.username}, {projection: {basicauthtoken: 0}}) // return all user properties, except the basic auth token
        .then((docs) => res.json(docs))
        .catch((e) => res.status(500).send())
});*/

router.get('/', (req, res, next) => {
    User.find((error, users) => {
        if (error) {
            res.send(error);
        } else {
            res.send(users);
        }
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save((error) => {
        if (error) {
            res.send(error);
        } else {
            console.log(user);
            res.status(201).json({
                message: "User created"
            });
        }
    });
});

// TODO fix - does not delete user even though response code 200
router.delete('/:userId', (req, res, next) => {
    User.findByIdAndDelete(req.path.userId, (error) => {
        if (error) {
            res.send(error);
        } else {
            res.send('User deleted successfully');
        }
    });
})

// TODO Implement Basic Routing (see notes)

module.exports = router;
