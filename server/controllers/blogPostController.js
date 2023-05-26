const Blog = require("../models/blogPost");

exports.createBlogPost = async (req, res, next) => {
  console.log(req.body.userId);
  try {
    const newBlog = new Blog({
      userId: req.body.userId,
      categoryList: req.body.categoryList,
      titleContent: req.body.titleContent,
      //   selectedPhoto: req.body.selectedPhoto,
      // Assuming you are using multer for file upload
      editorContent: req.body.editorContent,
    });

    const savedBlog = await newBlog.save();
    console.log(savedBlog);
    res.status(200).json(savedBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};
