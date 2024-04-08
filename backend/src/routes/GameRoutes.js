const express = require("express");
const router = express.Router();
const GameController = require("../controllers/GameController");
const { authenticateToken } = require("../middlewares/Auth");

router.get("game/:id", authenticateToken, GameController.getById);

module.exports = router;
