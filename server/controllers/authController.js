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
      return next(errorHandler(402, "User Not Found"));
    }
    const valiPassword = await bcrypt.compare(password, validUser.password);
    if (!valiPassword) {
      return next(errorHandler(402, "Invalid Password"));
    }
    const token = await jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECERET
    );
    const { password: pass, ...reset } = validUser._doc;
    res
      .status(200)
      .cookie("Acces_token", token, { httpOnly: true })
      .json(reset);
  } catch (error) {
    next(error);
  }
};
