const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

const home = require("./routes/home");
const user = require("./routes/user");
const task = require("./routes/task");

app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", task);

module.exports = app;
