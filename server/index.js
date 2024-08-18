const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./env/DB");
const CP = require("cookie-parser");

//Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
dotenv.config({ path: path.join(__dirname, "env/config.env") });

connectDatabase();

app.use(express.json());
app.use(CP());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(process.env.PORT, (req, rs) => {
  console.log(`server running ${process.env.PORT}`);
});

//Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
