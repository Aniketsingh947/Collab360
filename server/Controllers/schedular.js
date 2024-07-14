const SchedulerEvent = require("../modals/SchedularEvents");
const User = require("../modals/User");
// module.exports.crudActions = async (req, res) => {
//   console.log("in crud");
//   //   console.log(req);
//   try {
//     if (req.body.added !== null && req.body.added.length > 0) {
//       for (const eventData of req.body.added) {
//         await SchedulerEvent.create(eventData);
//       }
//     }

//     if (req.body.changed !== null && req.body.changed.length > 0) {
//       for (const eventData of req.body.changed) {
//         await SchedulerEvent.updateOne({ _id: eventData._id }, eventData);
//       }
//     }

//     if (req.body.deleted !== null && req.body.deleted.length > 0) {
//       for (const eventData of req.body.deleted) {
//         console.log(eventData._id);
//         await SchedulerEvent.deleteOne({ _id: eventData._id });
//       }
//     }

//     res.status(200).json({ message: "Success" });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports.crudActions = async (req, res) => {
  const { userId: curuser } = req.query;
  console.log(`crud:${curuser}`);
  try {
    if (req.body.added !== null && req.body.added.length > 0) {
      for (const eventData of req.body.added) {
        eventData.user = curuser; // Associate event with logged-in user
        await SchedulerEvent.create(eventData);
      }
    }

    if (req.body.changed !== null && req.body.changed.length > 0) {
      for (const eventData of req.body.changed) {
        await SchedulerEvent.updateOne(
          { _id: eventData._id, user: curuser }, // Ensure only the user's event is updated
          eventData
        );
      }
    }

    if (req.body.deleted !== null && req.body.deleted.length > 0) {
      for (const eventData of req.body.deleted) {
        console.log(eventData._id);
        await SchedulerEvent.deleteOne({ _id: eventData._id, user: curuser }); // Ensure only the user's event is deleted
      }
    }

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports.getData = async (req, res) => {
//   console.log("in getdata");
//   try {
//     const currentDate = new Date();
//     const monthsAgo = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - 1,
//       currentDate.getDate()
//     );
//     await SchedulerEvent.deleteMany({ starttime: { $lt: monthsAgo } });
//     const events = await SchedulerEvent.find();
//     res.status(200).json(events);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports.getData = async (req, res) => {
  const { userId: curuser } = req.query;
  console.log(`now:${curuser}`);
  console.log("in getdata");
  const userId = curuser; // Assuming req.user contains the logged-in user's info
  // console.log(userId);
  try {
    const currentDate = new Date();
    const monthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    await SchedulerEvent.deleteMany({
      starttime: { $lt: monthsAgo },
      user: userId,
    }); // Delete only the user's old events
    const events = await SchedulerEvent.find({ user: userId }); // Fetch only the user's events
    res.status(200).json(events);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
