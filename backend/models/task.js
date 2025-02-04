const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  marked: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Task", taskSchema);

module.exports = Model;
