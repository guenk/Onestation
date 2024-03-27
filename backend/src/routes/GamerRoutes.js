const express = require("express");
const GamerController = require("../controllers/GamerController.js");
const router = express.Router();

router.get("/gamer/:id", GamerController.getById);
router.put("/gamer/:id", GamerController.updateGamer);
router.delete("/gamer/:id", GamerController.deleteGamer);

module.exports = router;
