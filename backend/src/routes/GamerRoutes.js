const express = require("express");
const GamerController = require("../controllers/GamerController.js");
const router = express.Router();
const { authenticateToken } = require('../middlewares/Auth');

router.get("/gamer/:id", authenticateToken, GamerController.getById);
router.put("/gamer/:id", authenticateToken, GamerController.updateGamer);
router.delete("/gamer/:id", authenticateToken, GamerController.deleteGamer);

module.exports = router;
