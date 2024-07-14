const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messageControllers");
// const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.route("/:chatId").get(allMessages); //protect
router.route("/").post(sendMessage); //protect

module.exports = router;
