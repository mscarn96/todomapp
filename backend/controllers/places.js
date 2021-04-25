const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const Place = require("../models/Place");

exports.getPlaces = asyncHandler(async (req, res, next) => {
  const places = await Place.find({ user: req.user.id }).populate("tasks");
  res.status(200).json({ success: true, count: places.length, data: places });
});

exports.getPlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id).populate("tasks");

  if (!place) {
    return next(
      new ErrorResponse(`No place of id ${req.params.id} found!`),
      404
    );
  }
  res.status(200).json({ success: true, data: place });
});

exports.addPlace = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const place = await Place.create(req.body);

  res.status(200).json({ success: true, data: place });
});

exports.updatePlace = asyncHandler(async (req, res, next) => {
  let place = await Place.findById(req.params.id).populate("tasks");

  if (!place) {
    return next(
      new ErrorResponse(`No place of id ${req.params.id} found!`),
      404
    );
  }

  if (place.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update this place!`), 401);
  }

  place = await Place.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: place });
});

exports.deletePlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id).populate("tasks");

  if (!place) {
    return next(
      new ErrorResponse(`No place of id ${req.params.id} found!`),
      404
    );
  }

  if (place.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to delete this place!`), 401);
  }

  place.remove();

  res.status(200).json({ success: true, data: {} });
});

exports.deleteAllPlaces = asyncHandler(async (req, res, next) => {
  await Place.deleteMany({ user: req.user.id });

  res.status(200).json({ success: true, data: {} });
});
