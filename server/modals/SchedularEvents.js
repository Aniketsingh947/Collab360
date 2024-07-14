// models/scheduler.model.js
const mongoose = require("mongoose");

const SchedulerEventSchema = mongoose.Schema(
  {
    starttime: Date,
    endtime: Date,
    subject: String,
    location: String,
    description: String,
    isallday: Boolean,
    starttimezone: String,
    endtimezone: String,
    recurrencerule: String,
    recurrenceid: Number,
    recurrenceexception: String,
    followingid: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SchedulerEvent", SchedulerEventSchema);
