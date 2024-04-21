const express = require("express");
const { verfiyToken } = require("../utils/verfiyUser");
const { Createpost } = require("../controllers/postController");
const router = express.Router();

router.post("/create", verfiyToken, Createpost);

module.exports = router;
