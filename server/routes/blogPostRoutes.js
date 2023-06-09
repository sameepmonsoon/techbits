const express = require("express");
const {
  createBlogPost,
  getAllBlogPosts,
  getUserPosts,
  likeDislikeBlog,
  createBlogDraft,
  getBlogDraft,
  deleteBlogPost,
} = require("../controllers/blogPostController.js");

const router = express.Router();

// Create a Tweet
router.post("/", createBlogPost);
router.post("/createDraft", createBlogDraft);
router.get("/getDraft/:id", getBlogDraft);
router.get("/getAll", getAllBlogPosts);
router.get("/timeline/:id", getUserPosts);
router.post("/:id/like", likeDislikeBlog);
router.delete("/deleteBlog/:id", deleteBlogPost);

module.exports = router;
