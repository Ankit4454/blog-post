const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req || !req.headers || !req.headers.Authorization) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }
  const token = req.headers.Authorization.split()[1];
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_BLOG_POST);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Invalid token",
    });
  }
};