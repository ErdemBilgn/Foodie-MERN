const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
