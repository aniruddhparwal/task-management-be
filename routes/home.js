const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");

const { home } = require("../controller/homeController.js");

router.route("/").get(auth, home);

module.exports = router;
