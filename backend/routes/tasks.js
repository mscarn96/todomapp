const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  addTask,
  deleteTask,
  getTasksbyPlace,
  updateTask,
  getTask,
} = require("../controllers/tasks");

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

router.route("/").post(addTask).get(getTasksbyPlace);

module.exports = router;
