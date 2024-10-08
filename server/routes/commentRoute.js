const express = require("express");
const router = express.Router();

const {
  createComment,
  getPostComment,
  likeComment,
  editComment,
  deleteComment,
  getcomments,
 
} = require("../controllers/commentController");
const { verfiyToken } = require("../utils/verfiyUser");

router.post("/create", verfiyToken, createComment);
router.get("/getPostComments/:postId", verfiyToken, getPostComment);
router.put("/likeComment/:commentId", verfiyToken, likeComment);
router.put("/editComment/:commentId", verfiyToken, editComment);
router.delete("/deleteComment/:commentId", verfiyToken, deleteComment);
router.get("/getComments",verfiyToken,getcomments)
module.exports = router;
