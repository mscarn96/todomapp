const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.body.authorization && req.body.authorization.startsWith("bearer")) {
    token = req.body.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    return next(new ErrorResponse(`Not authorized to access this route!`, 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    console.log(decoded);

    next();
  } catch (error) {
    return next(new ErrorResponse(`Not authorized to access this route!`, 401));
  }
});
