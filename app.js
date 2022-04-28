var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

var indexRouter = require("./routes");
var postsRouter = require("./routes/posts");
var messagesRouter = require("./routes/messages");
var usersRouter = require("./routes/oauth");

var app = express();
app.use(logger("dev"));

app.use(cors({
  origin: '*'
}));
require('./database')()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/posts", postsRouter);
app.use("/oauth", usersRouter);
app.use("/messages", messagesRouter);

module.exports = app;
