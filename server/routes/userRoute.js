const express = require("express");
const {  Test } = require("../controllers/userController");
const { verfiyToken } = require("../utils/verfiyUser");
const { UpdateUser } = require("../controllers/authController");
const router=express.Router()


router.get("/signup",Test)
router.put("/update/:userId",verfiyToken, UpdateUser)





module.exports=router