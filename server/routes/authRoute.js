const express = require("express");
const { Signup, Signin, Google } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/google", Google);

module.exports = router;
