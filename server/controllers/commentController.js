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

exports.editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment Not Found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You Are Not Allowed To Edit This Comment")
      );
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment Not Found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You Are Not Allowed To Delete This Comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("commen has Delete");
  } catch (error) {
    next(error);
  }
};
