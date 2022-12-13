const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const {nanoid} = require('nanoid');

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
const MONGODB_PORT = process.env.DBPORT || '27017';
const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// add swagger ui
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc")

// swagger options (config)
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Meme Generator API",
            version: "1.0.0",
            description: "Express Meme Generator API"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

// test func to see if server works => go to http://localhost:3001
app.use((req, res, next) => {
    res.status(200).json({
        message: "It works"
    });
});

// the login middleware. Requires BasicAuth authentication
app.use((req, res, next) => {
    const users = db.get('users');
    users.findOne({basicauthtoken: req.headers.authorization}).then(user => {
        if (user) {
            req.username = user.username;  // test test => Basic dGVzdDp0ZXN0
            next()
        } else {
            res.set('WWW-Authenticate', 'Basic realm="401"')
            res.status(401).send()
        }
    }).catch(e => {
        console.error(e)
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send()
    })
})


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
