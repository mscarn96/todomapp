const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

const Task = require("../models/Task");

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`No task of id ${req.params.id} found!`),
      404
    );
  }

  res.status(200).json({ success: true, data: task });
});

exports.getTasksbyPlace = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ task: req.params.placeId });

  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`No task of id ${req.params.id} found!`),
      404
    );
  }

  task = await Task.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: task });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`No task of id ${req.params.id} found!`),
      404
    );
  }
  task.remove();

  res.status(200).json({ success: true, data: {} });
});

exports.addTask = asyncHandler(async (req, res, next) => {
  req.body.place = req.params.placeId;
  const task = await Task.create(req.body);
  console.log(task);

  res.status(200).json({ success: true, data: task });
});
