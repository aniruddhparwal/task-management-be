const User = require("../models/user");
const Task = require("../models/task");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");
const cookieToken = require("../utils/cookieToken");

exports.addTask = bigPromise(async (req, res, next) => {
  const {
    task_createdBy,
    task_creater_imgURL,
    task_name,
    task_description,
    task_type,
    task_createdAt,
  } = req.body;
  console.log(req.body, "req.body");
  console.log(req.user, "req.user");
  if (
    !task_createdBy ||
    !task_creater_imgURL ||
    !task_name ||
    !task_description ||
    !task_type
  ) {
    return next(new customError("Something is missing", 400));
  }
  const user = await Task.create({
    task_createdBy,
    task_creater_imgURL,
    task_name,
    task_description,
    task_type,
    task_index: 0,
    task_createdAt,
    task_user_id: req.user.id,
  });
  res.status(200).json(user);
});

exports.getAllTask = bigPromise(async (req, res, next) => {
  const todo = await Task.find({
    task_user_id: req.user.id,
    task_type: "todo",
  })
    .select({ task_user_id: 0 })
    .sort("task_index");
  const inprogress = await Task.find({
    task_user_id: req.user.id,
    task_type: "inProgress",
  })
    .select({ task_user_id: 0 })
    .sort("task_index");
  const done = await Task.find({
    task_user_id: req.user.id,
    task_type: "done",
  })
    .select({ task_user_id: 0 })
    .sort("task_index");

  res.status(200).json({
    todo: {
      title: "Todo",
      items: todo,
    },
    inProgress: {
      title: "In-progress",
      items: inprogress,
    },
    done: {
      title: "Done",
      items: done,
    },
  });
});

exports.updateAllTask = bigPromise(async (req, res, next) => {
  const { task_idList, task_type } = req.body;
  if (!task_idList || !task_type) {
    return next(new customError("Something is missing", 400));
  }
  task_idList.map((task_id, index) => {
    console.log(task_id, "task_idList");
    console.log(task_type, "task_type");
    Task.findByIdAndUpdate(task_id, {
      task_index: index + 1,
      task_type: task_type,
    })
      .then((task) => {
        console.log(task, "task");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  });
  // const task = await Task.findByIdAndUpdate(
  //   task_id,
  //   {
  //     task_type,
  //     task_index: task_index + 1,
  //   },
  //   { new: true }
  // );
  res.status(200).json("Task Updated");
});

exports.deleteTask = bigPromise(async (req, res, next) => {
  const { task_id } = req.body;
  if (!task_id) {
    return next(new customError("Something is missing", 400));
  }
  const task = await Task.findByIdAndDelete(task_id);
  res.status(200).json("Task Deleted");
});
