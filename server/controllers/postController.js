// const Post = require("../models/postModel");

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
exports.getPosts = async (req, res, next) => {
  try {
    //query means ? this Symbol
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $option: "i" },
          },
          {
            content: { $regex: req.query.searchTerm, $option: "i" },
          },
        ],
      }),
    })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPost,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};
