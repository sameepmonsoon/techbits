const Blog = require("../models/blogPost.js");
const Draft = require("../models/blogDraft.js");

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

// for draft
exports.createBlogDraft = async (req, res, next) => {
  try {
    const getAllBlogDraft = await Draft.find({ userId: req.body.userId });
    if (getAllBlogDraft.length > 2) {
      res.status(500).json({ error: "Can't save more than 2 drafts." });
    } else {
      const fileData = Buffer.from(req.body.selectedPhoto, "base64");
      if (req.body.id) {
        const previousDraf = await Draft.find({ _id: id });
        console.log(previousDraf);
      } else {
        const newBlogDraft = new Draft({
          username: req.body.username,
          userId: req.body.userId,
          categoryList: req.body.categoryList,
          titleContent: req.body.titleContent,
          selectedPhoto: req.body.selectedPhoto,
          editorContent: req.body.editorContent,
        });

        const savedBlogDraft = await newBlogDraft.save();
        res
          .status(200)
          .json({ savedBlogDraft, message: "Draft saved Successfully." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save as draft." });
  }
};

exports.getBlogDraft = async (req, res) => {
  try {
    const getAllBlogDraft = await Draft.find({ userId: req.params.id });
    res.status(200).json({
      getAllBlogDraft,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch drafts." });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const isPresent = Blog.findOne({ _id: blogId });
    if (isPresent) {
      Blog.deleteOne({ _id: blogId });
      res.status(200).json({
        message: "Deleted",
        flag: true,
      });
    } else {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch delete." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete." });
  }
};
