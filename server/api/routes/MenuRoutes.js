const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

// get all menu items
router.get("/", menuController.getAllMenuItems);

module.exports = router;
