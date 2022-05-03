var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes");
var postsRouter = require("./routes/posts");
var messagesRouter = require("./routes/messages");
var authRouter = require("./routes/oauth");
var pushRouter = require("./routes/push");
var usersRouter = require("./routes/users");

var app = express();
app.use(logger("dev"));

app.use(
  cors({
    origin: "*"
  })
);
require("./database")();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var firebase = require("firebase-admin");

var serviceAccount = require("./moldogram-firebase-adminsdk-oz0v5-44b6c3e8c8.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://moldogram-default-rtdb.europe-west1.firebasedatabase.app"
});

app.firebase = firebase;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,x-localization,authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", indexRouter);
app.use("/posts", postsRouter(app));
app.use("/oauth", authRouter);
app.use("/push", pushRouter);
app.use("/messages", messagesRouter);
app.use("/users", usersRouter(app));

module.exports = app;
