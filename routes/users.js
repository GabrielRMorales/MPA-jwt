const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/register",userController.get_register);

router.post("/register",userController.post_register);

router.get("/login",userController.get_login);

router.post("/login", userController.post_login);

router.get("/logout",userController.get_logout);

module.exports = router;