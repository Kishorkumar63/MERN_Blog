const express = require("express");
const router = express.Router();

const {
  createComment,
  getPostComment,
} = require("../controllers/commentController");
const { verfiyToken } = require("../utils/verfiyUser");

router.post("/create", verfiyToken, createComment);
router.get("/getPostComments/:postId", verfiyToken, getPostComment);
module.exports = router;
