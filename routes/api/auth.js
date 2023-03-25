const express = require("express");
const router = express.Router({ mergeParams: true });
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route   POST /api/auth
// @desc    Authenticate admin
// @access  Public
router.post("/", (req, res) => {
  const { password } = req.body;

  // Send error message if password is not entered
  if (!password) {
    return res.status(400).json({ msg: "Please enter field" });
  }

  // Validate password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // If password matches, sign a new jwt that expires in 5 minutes and send it to the client
  jwt.sign({}, process.env.JWT_KEY, { expiresIn: 300 }, (err, token) => {
    if (err) throw err;

    res.json({
      token,
    });
  });
});

// @route   GET /api/auth/admin
// @desc    Authenticate admin
// @access  Private
router.get("/admin", auth, (req, res) => {
  // Sign a new jwt if token is still available when client loads content
  jwt.sign({}, process.env.JWT_KEY, { expiresIn: 300 }, (err, token) => {
    if (err) throw err;

    res.json({
      token,
    });
  });
});

module.exports = router;
