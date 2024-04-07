const Cart = require("../models/Cart");

// get cart using email

const getCartByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const query = { email };
    const result = await Cart.find(query).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Post a cart item
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    // check existing item
    const existingItem = await Cart.findOne({ menuItemId, email });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Product Already Exists In The Cart" });
    }
    const cartItem = await Cart.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete a cart item
const deleteCartItem = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(cartId);
    if (!deletedCartItem) {
      return res.status(401).json({ message: "Cart Item Could Not Found!" });
    }

    res.status(200).json({ message: "Deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUsersCart = async (user) => {
  const query = { email: user.email };
  await Cart.deleteMany(query);
};

// Update a cart item

const updateCartItem = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartId,
      {
        menuItemId,
        name,
        recipe,
        image,
        price,
        quantity,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateCartItem) {
      return res.status(404).json({ message: "Cart Item Could Not Found!" });
    }

    return res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single recipe
const getSingleCartItem = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Cart.findById(cartId);
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCartItem,
  updateCartItem,
  getSingleCartItem,
  deleteUsersCart,
};
