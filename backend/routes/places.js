const express = require("express");
const router = express.Router();

const {
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  addPlace,
} = require("../controllers/places");

const tasksRouter = require("./tasks");

router.use("/:placeId/tasks", tasksRouter);

router.route("/").get(getPlaces).post(addPlace);

router.route("/:id").get(getPlace).delete(deletePlace).put(updatePlace);

module.exports = router;
