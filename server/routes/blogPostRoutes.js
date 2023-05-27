const express = require("express");
const {
  createBlogPost,
  getAllBlogPosts,
  getUserPosts,
  likeDislikeBlog,
} = require("../controllers/blogPostController.js");

const router = express.Router();

// Create a Tweet
router.post("/", createBlogPost);
router.get("/getAll", getAllBlogPosts);
router.get("/timeline/:id", getUserPosts);
router.post("/:id/like", likeDislikeBlog);

module.exports = router;
