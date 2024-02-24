const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,

      unique: true,
    },
    email: {
      type: String,
      required: true,

      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilrPicture: {
      type: String,
      default: "/img/kk.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
