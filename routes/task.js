const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addTask,
  getAllTask,
  updateAllTask,
  deleteTask,
} = require("../controller/taskController.js");

router.route("/addTask").post(auth, addTask);
router.route("/updateAllTask").post(auth, updateAllTask);
router.route("/getAllTask").get(auth, getAllTask);
router.route("/deleteTask").post(auth, deleteTask);

module.exports = router;
