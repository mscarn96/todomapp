const express = require("express");
const { deleteAllTasks } = require("../controllers/tasks");

const {
  register,
  login,
  getMe,
  forgotPassword,
  getAllUserTasks,
  resetPassword,
  getResetPassword,
  updateName,
  updatePassword,
  logout,
} = require("../controllers/user");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/getme").get(protect, getMe);

router.route("/updatename").put(protect, updateName);

router.route("/updatepassword").put(protect, updatePassword);

router.route("/forgotpassword").post(forgotPassword);

router.route("/getresetpassword/:resettoken").get(getResetPassword);

router.route("/resetpassword/:resettoken").put(resetPassword);

router
  .route("/tasks")
  .get(protect, getAllUserTasks)
  .delete(protect, deleteAllTasks);

module.exports = router;
