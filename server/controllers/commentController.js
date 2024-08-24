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

exports.likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return errorHandler(next(404, "comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberofLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberofLikes += 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
