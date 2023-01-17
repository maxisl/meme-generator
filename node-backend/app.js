const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
// use nanoid to generate id?
// const {nanoid} = require('nanoid');

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
const MONGODB_PORT = process.env.DBPORT || "27017";
// const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://127.0.0.1:${MONGODB_PORT}/omm-2223`, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

// test mongoose connection
db.once("open", () => {
  console.log(
    `Successfully connected to Connected to MongoDB on port ${MONGODB_PORT}`
  );
});

db.on("error", (error) => {
  console.error(error);
});

// ######

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const memesRouter = require("./routes/memes");
const authRouter = require("./routes/auth");

const app = express();

// add swagger ui
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// swagger options (config)
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Meme Generator API",
      version: "1.0.0",
      description: "Express Meme Generator API",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    definitions: {
      Meme: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Meme's unique ID",
          },
          title: {
            type: "string",
            description: "Meme's title",
          },
          imageUrl: {
            type: "string",
            description: "URL of the meme image",
          },
          description: {
            type: "string",
            description: "Meme's description",
          },
          likes: {
            type: "integer",
            description: "Number of likes for the meme",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the meme was created",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the meme was last updated",
          },
          comments: {
            type: "array",
            items: {
              $ref: "#/definitions/Comment",
            },
          },
        },
      },
      Comment: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Comment's text",
          },
        },
      },
      NewMeme: {
        type: "object",
        required: ["author", "title", "image", "tags", "comments"],
        properties: {
          author: {
            type: "string",
          },
          title: {
            type: "string",
          },
          image: {
            type: "string",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
          },
          comments: {
            type: "array",
            items: {
              $ref: "#/definitions/Comment",
            },
          },
        },
      },
      User: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            description: "The name of the user",
          },
          email: {
            type: "string",
            description: "The email address of the user",
          },
          password: {
            type: "string",
            description: "The hashed password of the user",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

// // generate the Swagger document
const specs = swaggerJsDoc(options);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
// extract json data and make it usable
app.use(express.json());
// method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// enable swagger: http://localhost:3001/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

// the login middleware. Requires BasicAuth authentication
// TODO move to index?  deactivated due to missing authentication
/*app.use((req, res, next) => {
        const users = db.get('users');
        if (users) {
            console.log("found users");
        }
    }
)*/

/*

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
})*/

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/memes", memesRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
