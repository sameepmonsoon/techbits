const Blog = require("../models/blogPost.js");

exports.createBlogPost = async (req, res, next) => {
  try {
    const fileData = Buffer.from(req.body.selectedPhoto, "base64");
    const newBlog = new Blog({
      username: req.body.username,
      userId: req.body.userId,
      categoryList: req.body.categoryList,
      titleContent: req.body.titleContent,
      selectedPhoto: req.body.selectedPhoto,
      editorContent: req.body.editorContent,
    });

    const savedBlog = await newBlog.save();
    res.status(200).json({ savedBlog, message: "Published Successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    console.log(getAllBlog);
    res.status(200).json({
      getAllBlog,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const userPost = await Blog.find({ userId: req.params.id });
    console.log(userPost);
    res.status(200).json({
      userPost,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};
exports.likeDislikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userId;
    console.log(blogId, userId);

    const likeBlog = await Blog.findById(blogId);

    if (!likeBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const existingLikeIndex = likeBlog.likes.findIndex(
      (like) => like === userId
    );

    if (existingLikeIndex !== -1) {
      likeBlog.likes.splice(existingLikeIndex, 1);
    } else {
      likeBlog.likes.push(userId);
    }

    await likeBlog.save();

    const updatedLikeBlog = await Blog.findById(blogId);

    res.status(200).json({
      updatedLikeBlog,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to like/dislike the blog post" });
  }
};
