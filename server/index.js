const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./env/DB");

//Routes
const userRoute = require("./routes/userRoute");
const authRoute=require("./routes/authRoute")
dotenv.config({ path: path.join(__dirname, "env/config.env") });

connectDatabase();

app.listen(process.env.PORT, (req, rs) => {
  console.log(`server running ${process.env.PORT}`);
});
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
