const express = require("express");
const router = express.Router();
const userRegisterController = require("../Controller/registerController");
const userLoginController = require("../Controller/loginController");
const accountDeleteController = require("../Controller/accountDeleteController");

//SIGNUP || METHOD POST
router.post("/userregister", userRegisterController);

//LOGIN || METHOD POST
router.post("/userlogin", userLoginController);

//LOGIN || METHOD POST
router.post("/accountDelete", accountDeleteController);

module.exports = router;
