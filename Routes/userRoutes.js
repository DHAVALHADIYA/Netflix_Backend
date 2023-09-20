const express = require("express");
const router = express.Router();
const userRegisterController = require("../Controller/registerController");
const userLoginController = require("../Controller/loginController");
const accountDeleteController = require("../Controller/accountDeleteController");
const favouritesController = require("../Controller/favouritesController");
const getfavMovieController = require("../Controller/getfavMovieController");
const favMovieDeleteController = require("../Controller/favMovieDeleteController");
const verifytoken = require("../MiddleWare/auth");

//SIGNUP || METHOD POST
router.post("/userregister", userRegisterController);

//LOGIN || METHOD POST
router.post("/userlogin", userLoginController);

//ACCOUNT DELETE || METHOD POST
router.post("/accountDelete", verifytoken, accountDeleteController);

//ADDED FAV MOVIES || METHOD POST
router.post("/addfav", verifytoken, favouritesController);

//ADDED FAV MOVIES || METHOD GET
router.get("/getfav", verifytoken, getfavMovieController);

//ADDED FAV MOVIES || METHOD GET
router.post("/favdlt", verifytoken , favMovieDeleteController);

module.exports = router;
