const express = require("express");
const {
  Test,
  deleteUser,
  SignOut,
  getUsers,
  getUser,
} = require("../controllers/userController");
const { verfiyToken } = require("../utils/verfiyUser");
const { updateUser } = require("../controllers/authController");

const router = express.Router();

router.get("/signup", Test);
router.put("/update/:userId", verfiyToken, updateUser);
router.delete("/delete/:userId", verfiyToken, deleteUser);
router.post("/signout", SignOut);
router.get("/getusers", verfiyToken, getUsers);
router.get("/:userId", getUser);

module.exports = router;
