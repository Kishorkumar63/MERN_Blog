const express = require("express");
const { Test } = require("../controllers/userController");
const { verfiyToken } = require("../utils/verfiyUser");
const { updateUser } = require("../controllers/authController");

const router = express.Router();

router.get("/signup", Test);
router.put("/update/:userId", verfiyToken, updateUser);

module.exports = router;
