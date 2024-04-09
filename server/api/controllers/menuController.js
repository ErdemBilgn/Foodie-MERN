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

// Delete a Menu Item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item Could Not Found!" });
    }
    res.status(200).json({ message: "Menu Item Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get A Single Menu Item
const getSingleMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Menu.findById(id).exec();
    if (!result)
      return res.status(404).json({ message: "Item Could Not Found!" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Single Menu Item

const updateSingleMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updateItem = await Menu.findByIdAndUpdate(
      id,
      {
        name,
        recipe,
        image,
        category,
        price,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateItem)
      return res.status(404).json({ message: "Item Could Not Found!" });

    res.status(200).json(updateItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItems,
  deleteMenuItem,
  getSingleMenuItem,
  updateSingleMenuItem,
};
