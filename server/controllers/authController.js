const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

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

exports.Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found !"));
    }
    const validPassword = await bcrypt.compare(
      password,
      User.validate.password
    );
    if (!validPassword) return next(errorHandler(404, "Wrong Credential!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cokkie("token", token, {
      htpOnly: true,
      expires: new Date(Date.now) + 24 * 60 * 60 * 1000,
    }).status(200).json({
      validUser
    })
  } catch (error) {
    next(error);
  }
};
