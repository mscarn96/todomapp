var express = require("express");
var router = express.Router();

const {
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  addPlace,
} = require("../controllers/places");

router.route("/").get(getPlaces).post(addPlace);

router.route("/:id").get(getPlace).delete(deletePlace).put(updatePlace);

module.exports = router;
