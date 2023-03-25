const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");
require("dotenv/config");

// @route   GET /api/posts
// @desc    Get 10 posts
// @access  Public
router.get("/", (req, res) => {
  // Use Instagram Basic Display API to access the posts
  axios
    .get(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${process.env.IG_ACCESS_TOKEN}`
    )
    .then((IGres) => {
      // Limit posts from 25 to 15
      let posts = IGres.data.data.filter((post, i) => {
        if (i < 20) return post;
      });
      res.send(posts);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Error in retreiving posts" });
    });
});

module.exports = router;
