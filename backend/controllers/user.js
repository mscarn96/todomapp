const crypto = require("crypto");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.register = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    {
      return next(new ErrorResponse(`Invalid email or password`, 401));
    }
  }
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse(`Invalid email or password`, 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("places")
    .populate("tasks");

  if (!user)
    return next(new ErrorResponse(`Not authorized to access this route!`, 401));

  res.status(200).json({ success: true, data: user });
});

exports.getAllUserTasks = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("tasks");

  if (!user)
    return next(new ErrorResponse(`Not authorized to access this route!`, 401));

  res.status(200).json({ success: true, data: user.tasks });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorResponse(`Wrong email!`, 404));

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/getresetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Link to reset password: ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password email token`,
      message,
    });

    res.status(200).json({ success: true, data: "Email send" });
  } catch (err) {
    console.log(err);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.getResetPassword = asyncHandler(async (req, res, next) => {
  if (!req.params.resettoken) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  res.status(200).json({
    success: true,
    data: {
      resettoken: req.params.resettoken,
    },
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.updateName = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
  });

  if (!user)
    return next(new ErrorResponse(`Not authorized to access this route!`, 401));

  res.status(200).json({ success: true, name: req.body.name });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordCorrect = await user.matchPassword(req.body.currentPassword);

  if (!isPasswordCorrect) {
    return next(new ErrorResponse(`Password is incorrect!`, 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
