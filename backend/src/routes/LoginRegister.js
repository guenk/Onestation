const express = require("express");
const router = express.Router();
const authControllers = require("./controllers/authControllers"); 

// Auth
router.post("/auth/login", authControllers.login);
router.post("/auth/register", authControllers.register);