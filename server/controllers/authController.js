const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (username === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashPassword = await bcrypt.hash(password,10);
  try {
    const newUser = await User.create({ username, email, password:hashPassword });
    res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
