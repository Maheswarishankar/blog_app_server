
const express = require("express");

const {registerController, getAllusers, loginController} = require("../controllers/userControllers");
 const {protect} = require("../middleWare/authmiddleWare")


//router object
const router = express.Router();

//Create user||POST
router.post("/register",registerController);

//Get All users || GET

 //router.get("/allusers",getAllusers);

 router.route("/allusers").get(protect,getAllusers);

//Login user || POST
router.post("/login",loginController)


module.exports = router
