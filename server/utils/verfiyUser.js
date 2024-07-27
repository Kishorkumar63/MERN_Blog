const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");
exports.verfiyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(errorHandler(400, "unAuthorized"));
  }
  jwt.verify(token, process.env.JWT_SECERET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "KK"));
    }
    req.user = user;
    next();
  });
};
