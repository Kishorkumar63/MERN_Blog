const express = require("express");
const {  Test } = require("../controllers/userController");
const router=express.Router()


router.get("/signup",Test)





module.exports=router