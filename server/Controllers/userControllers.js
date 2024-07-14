const asyncHandler = require("express-async-handler");
const User = require("../modals/User");
// const generateToken = require("../config/generateToken");
const generateToken = require("../middleware/generateToken");
const Chat = require("../modals/Chats");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  console.log("in all user");
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword); //.find({ _id: { $ne: req.user._id } })
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // pic
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    // pic,
  });
  console.log("created");

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log("logged in");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const profileUpdate = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const { name, email, profilePicture } = req.body;
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (email !== undefined) updateFields.email = email;
  if (profilePicture !== undefined)
    updateFields.profilePicture = profilePicture;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true } // Return the updated document
    );
    console.log(updatedUser);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // pic: user.pic,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

const fetchproject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(req.user);
  try {
    const groups = await Chat.find({
      users: userId,
      isGroupChat: true,
    })
      .select("chatName groupAdmin")
      .populate("groupAdmin", "name");

    const groupDetails = groups.map((group) => ({
      groupName: group.chatName,
      groupAdmin: group.groupAdmin ? group.groupAdmin.name : "No Admin",
    }));
    console.log(groupDetails);

    res.status(200).json(groupDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Project Error" });
  }
});

module.exports = {
  allUsers,
  registerUser,
  authUser,
  profileUpdate,
  fetchproject,
};
