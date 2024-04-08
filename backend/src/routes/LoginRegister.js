const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/AuthController"); 

// Auth
router.post("/auth/login", authControllers.login);
router.post("/auth/register", authControllers.register);

module.exports = router;