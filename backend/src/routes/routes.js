const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/AuthController"); 
const GameController = require("../controllers/GameController");
const GamerController = require("../controllers/GamerController");
const { authenticateToken } = require("../middlewares/Auth");


// Auth routes
router.post("/auth/login", authControllers.login);
router.post("/auth/register", authControllers.register);

// Gamer routes
router.get("/gamer/:id", authenticateToken, GamerController.getById);
router.put("/gamer/:id", authenticateToken, GamerController.updateGamer);
router.delete("/gamer/:id", authenticateToken, GamerController.deleteGamer);

// Game route
router.get("game/:id", authenticateToken, GameController.getById);

module.exports = router;