// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const schedulerRoutes = require("./routes/SchedularRoutes");
const UserRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));
console.log("its here");
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json()); //app.use(cors()); app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/scheduleevents", schedulerRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/schedular") //"mongodb://127.0.0.1:27017/schedular"
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

const PORT = 8080;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`) //.yellow.bold
);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    socket.emit("connected");
  });

  /////************************************** */
  // setInterval(() => {
  //   io.emit("test event", { message: "Test event from server" });
  // }, 10000); // Emit every 10 seconds
  /////*********************** */

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log("socket listening to new message");
    var chat = newMessageRecieved.chat;
    console.log(chat);

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      console.log(`printing userid ${user._id}`);

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
