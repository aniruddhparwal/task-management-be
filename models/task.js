const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task_user_id: {
    type: String,
    required: [true, "Please Provide User Id"],
  },
  task_createdBy: {
    type: String,
    required: [true, "Please Provide User Id"],
  },
  task_creater_imgURL: {
    type: String,
    default: "https://picsum.photos/300",
  },
  task_name: {
    type: String,
    required: [true, "Please Provide Task Name"],
    maxlength: [40, "Task Name Should be under 40 Characters"],
  },
  task_description: {
    type: String,
    required: [true, "Please Provide Task Description"],
    maxlength: [200, "Task Description Should be under 200 Characters"],
  },
  task_type: {
    type: String,
    required: [true, "Please Provide Task Type"],
  },
  task_index: {
    type: Number,
    default: 1,
  },
  task_createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
