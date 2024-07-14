const express = require("express");
const router = express.Router();
const scheduleService = require("../Controllers/schedular");
const { protect } = require("../middleware/authmiddleware");

router.route("/crudActions").post(scheduleService.crudActions);
router.route("/getData").post(scheduleService.getData);
router.post("/signup", scheduleService.signup);
module.exports = router;
