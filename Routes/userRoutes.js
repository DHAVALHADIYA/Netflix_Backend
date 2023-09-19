const express = require("express");
const router = express.Router();
const userRegisterController = require("../Controller/registerController");
const userLoginController = require("../Controller/loginController");

//SIGNUP || METHOD POST
router.post("/userregister", userRegisterController);

//LOGIN || METHOD POST
router.post("/userlogin", userLoginController);

module.exports = router;
