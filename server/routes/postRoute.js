const express = require("express");
const { verfiyToken } = require("../utils/verfiyUser");
const { Createpost, getPosts } = require("../controllers/postController");
const router = express.Router();

router.post("/create", verfiyToken, Createpost);
router.get("/getposts", getPosts);

module.exports = router;
