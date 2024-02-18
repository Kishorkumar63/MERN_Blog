const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error");

exports.Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are Required"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    next(error);
  }
};
