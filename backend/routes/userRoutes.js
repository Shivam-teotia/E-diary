const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controller/userController");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
module.exports = router;
