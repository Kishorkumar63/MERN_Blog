const Post = require("../models/postModel");
const { errorHandler } = require("../utils/error");

exports.Createpost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You Are not allowed to create a Post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savePost = await newPost.save();
    res.status(201).json({
      savePost,
    });
  } catch (error) {
    next(error);
  }
};
