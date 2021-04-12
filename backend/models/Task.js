const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please name a place"],
    trim: true,
    maxLength: [40, "Name can't be longer than 40 characters"],
  },
  description: {
    type: String,
    maxLength: [100, "Description can't be longer than 100 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
    required: [true, "Please add task completion date "],
    min: [Date.now, "Task completion date can't be in past"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  place: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Place",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
