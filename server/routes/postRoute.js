const express = require("express");
const { verfiyToken } = require("../utils/verfiyUser");
const {
  Createpost,
  getPosts,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.post("/create", verfiyToken, Createpost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verfiyToken, deletePost);

module.exports = router;
