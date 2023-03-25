require("dotenv/config");
const jwt = require("jsonwebtoken");

// Authentication using jwt. If token exists and has not expired, continue to next
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decodedInfo = jwt.verify(token, process.env.JWT_KEY);

    // If no error is thrown and decoded info is valid, then token is verified
    if (decodedInfo) {
      next();
    }
  } catch (e) {
    res.status(400).json({ msg: "Token is invalid" });
  }
};

module.exports = auth;
