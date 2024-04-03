const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// get all cart items
router.get("/", cartController.getCartByEmail);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.deleteCartItem);
router.put("/:id", cartController.updateCartItem);
router.get("/:id", cartController.getSingleCartItem);

module.exports = router;
