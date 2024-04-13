const User = require("../models/User");
const { deleteUsersCart } = require("./cartController");
// Get All Users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user.email };

    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User Already Exists" });
    }
    const result = await User.create(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an User

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User Could Not Found!" });

    deleteUsersCart(deletedUser);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get Admin

const getAdmin = async (req, res) => {
  const { email } = req.params;
  query = { email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Unauthorized!!" });
    }

    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Make an User admin

const makeAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        role: "admin",
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User Could Not Found!" });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
};
