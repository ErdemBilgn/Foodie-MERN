const Menu = require("../models/Menu");

// Get All Menu Items
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Post A New Menu Item

const postMenuItems = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllMenuItems, postMenuItems };
