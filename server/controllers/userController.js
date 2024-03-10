const User = require("../models/userModel");
const { errorHandler } = require("../utils/error");

exports.Test = (req, res) => {
  res.json({ name: "Kishor" });
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(402, "Your Are Not allowed to Delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};
