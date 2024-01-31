const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    next();
  }
  try {
    const user = jwt.verify(token, process.env.jwt_secret_key);
    req.userDetail = user;
    next();
  } catch (error) {
    return res.status(500).json({
        message:"Internal server error",
    })
  }
};

module.exports = { authMiddleware };
