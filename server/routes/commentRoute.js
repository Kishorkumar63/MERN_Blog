const express = require("express");
const router = express.Router();

const {
  createComment,
  getPostComment,
  likeComment,
} = require("../controllers/commentController");
const { verfiyToken } = require("../utils/verfiyUser");

router.post("/create", verfiyToken, createComment);
router.get("/getPostComments/:postId", verfiyToken, getPostComment);
router.put("/likeComment/:commentId",verfiyToken,likeComment)

module.exports = router;
