const express = require("express");
const verifytoken = require("../MiddleWare/auth");
const router = express.Router();
const userRegisterController = require("../Controller/registerController");
const userLoginController = require("../Controller/loginController");
const accountDeleteController = require("../Controller/accountDeleteController");
const favouritesController = require("../Controller/favouritesController");
const getfavMovieController = require("../Controller/getfavMovieController");
const favMovieDeleteController = require("../Controller/favMovieDeleteController");
const oldUserController = require("../Controller/oldUserController");

//SIGNUP || METHOD POST
router.post("/userregister", userRegisterController);

//LOGIN || METHOD POST
router.post("/userlogin", userLoginController);

//ACCOUNT DELETE || METHOD POST
router.post("/accountDelete", verifytoken, accountDeleteController);

//ADDED FAV MOVIES || METHOD POST
router.post("/addfav", verifytoken, favouritesController);

//GET FAV MOVIES || METHOD GET
router.get("/getfav", verifytoken, getfavMovieController);

//DLT FAV MOVIES || METHOD POST
router.post("/favdlt", verifytoken, favMovieDeleteController);

//ADDED OLD ACCOUNT || METHOD POST
router.post("/olduser", verifytoken, oldUserController);

module.exports = router;
