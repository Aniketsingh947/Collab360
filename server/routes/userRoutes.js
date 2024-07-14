const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  profileUpdate,
  fetchproject,
} = require("../Controllers/userControllers");
// const { protect } = require("../middleware/authMiddleware");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.route("/profileupdate").put(protect, profileUpdate);
router.route("/fetchproject").get(protect, fetchproject);

module.exports = router;
