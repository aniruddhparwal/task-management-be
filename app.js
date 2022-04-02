const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   var corsOptions = {
//     origin: "https://task-managemnt.netlify.app",
//     optionsSuccessStatus: 200,
//     credentials: true,
//   };
//   app.options("*", cors(corsOptions));
//   app.use(cors(corsOptions));
// }
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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
