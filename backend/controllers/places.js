const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const Place = require("../models/Place");

exports.getPlaces = asyncHandler(async (req, res, next) => {
  const places = await Place.find({});
  res.status(200).json({ success: true, data: places });
});

exports.getPlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);

  console.log(place.yellow);

  if (!place) {
    return next(
      new ErrorHandler(`No place of id ${req.params.id} found!`),
      404
    );
  }
  res.status(200).json({ success: true, data: place });
});

exports.addPlace = asyncHandler(async (req, res, next) => {
  const place = await Place.create(req.body);

  res.status(200).json({ success: true, data: place });
});

exports.updatePlace = asyncHandler(async (req, res, next) => {
  let place = await Place.findById(req.params.id);

  if (!place) {
    return next(
      new ErrorHandler(`No place of id ${req.params.id} found!`),
      404
    );
  }

  place = await Place.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: place });
});

exports.deletePlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return next(
      new ErrorHandler(`No place of id ${req.params.id} found!`),
      404
    );
  }
  place.remove();

  res.status(200).json({ success: true, data: {} });
});
