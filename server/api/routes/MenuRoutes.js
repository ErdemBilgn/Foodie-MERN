const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

// get all menu items
router.get("/", menuController.getAllMenuItems);

// post a menu item
router.post("/", menuController.postMenuItems);

//delete a menu ıtem
router.delete("/:id", menuController.deleteMenuItem);

// get a single menu item
router.get("/:id", menuController.getSingleMenuItem);

// update a single menu item
router.patch("/:id", menuController.updateSingleMenuItem);

module.exports = router;
