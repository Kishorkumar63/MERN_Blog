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

exports.Google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  if (!name || !email || name === "" || email === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECERET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = await bcrypt.hash(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECERET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

exports.UpdateUser = async (req, res, next) => {
  if (req.user._id !== req.params.userId) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "you are not allowed to upadate this user")
      );
    }

    req.body.password = bcrypt.hash(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 character")
      );
    }
    if (req.body.username.includes("")) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 character")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }

    try {
      const username = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        {
          new: true,
        }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
