const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/AuthController");
const GameController = require("../controllers/GameController");
const GamerController = require("../controllers/GamerController");
const RoleController = require("../controllers/RoleController");
const { authenticateToken } = require("../middlewares/Auth");

// Auth routes
router.post("/auth/login", authControllers.login);
router.post("/auth/register", authControllers.register);

// Gamer routes
router.get("/gamer/:id", authenticateToken, GamerController.findById);
router.put("/gamer/:id", authenticateToken, GamerController.editGamer);
router.delete("/gamer/:id", authenticateToken, GamerController.removeGamer);

// Game route
router.get("/game/:id", authenticateToken, GameController.findById);

// role route
router.get("/roles", authenticateToken, RoleController.findRoles);

module.exports = router;
