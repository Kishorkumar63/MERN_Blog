const { errorHandler } = require("../utils/error");

const Comment = require("../models/commentModel");
exports.createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, "You Not Allowed To Create This Comment"));
    }
    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
exports.getPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      cretedAt: -1,
    });
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
};
