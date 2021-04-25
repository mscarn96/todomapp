const express = require("express");
const router = express.Router();

const {
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  addPlace,
  deleteAllPlaces,
} = require("../controllers/places");

const { protect } = require("../middleware/auth");

const tasksRouter = require("./tasks");

router.use("/:placeId/tasks", tasksRouter);

router
  .route("/")
  .get(protect, getPlaces)
  .post(protect, addPlace)
  .delete(protect, deleteAllPlaces);

router
  .route("/:id")
  .get(getPlace)
  .delete(protect, deletePlace)
  .put(protect, updatePlace);

module.exports = router;
