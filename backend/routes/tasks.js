const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  addTask,
  deleteTask,
  getTasksbyPlace,
  updateTask,
  getTask,
} = require("../controllers/tasks");

const {protect} = require('../middleware/auth')

router.route("/:id").get(getTask).put(protect, updateTask).delete(protect, deleteTask);

router.route("/").post(protect, addTask).get(getTasksbyPlace);

module.exports = router;
