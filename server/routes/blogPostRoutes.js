const express = require("express");
// import { verifyToken } from "../verifyToken.js";
const {
  createBlogPost,
  // deleteBlogPost,
  //   likeOrDislike,
  //   getAllBlogPost,
  //   getUserBlogPost,
  //   getExploreBlogs,
} = require("../controllers/blogPostController.js");

const router = express.Router();

// Create a Tweet
router.post("/", createBlogPost);

// Delete a Tweet
// router.delete("/:id", verifyToken, deleteBlogPost);

// Like or Dislike a Tweet
// router.put("/:id/like", likeOrDislike);

// get all timeline tweets
// router.get("/timeline/:id", getAllBlogPost);

// get user Tweets only
// router.get("/user/all/:id", getUserBlogPost);

//explore
// router.get("/explore", getExploreBlogs);
module.exports = router;
