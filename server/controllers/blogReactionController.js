const BlogReaction = require("../models/blogReaction.js");

exports.like = async (req, res) => {
  try {
    const userBlogId = req.body.blogId;
    const userId = req.body.userId;
    const findBlog = await BlogReaction.findOne({ blogId: userBlogId });
    if (!findBlog) {
      const newBlog = new BlogReaction({ ...req.body });
      await newBlog.save();
      // res.status(404).json({ message: "blog not found" });
      if (findBlog && findBlog.likes) {
        const existingIndex = findBlog.likes.findIndex(
          (like) => like === userId
        );
      } else {
        if (existingIndex == -1) {
          findBlog.likes.splice(existingIndex, 1);
        } else {
          findBlog.likes.push(userId);
        }
      }
      await findBlog.save();
      const updatedlikeComment = await BlogReaction.findOne({
        blogId: userBlogId,
      });

      res.status(200).json({ updatedlikeComment, message: "Success liked" });
    } else {
      const existingIndex = findBlog.likes.findIndex((like) => like === userId);
      if (existingIndex !== -1) {
        findBlog.likes.splice(existingIndex, 1);
        await findBlog.save();
        const updatedlikeComment = await BlogReaction.findOne({
          blogId: userBlogId,
        });

        res
          .status(200)
          .json({ updatedlikeComment, message: "Like removed", liked: false });
      } else {
        findBlog.likes.push(userId);
        await findBlog.save();
        const updatedlikeComment = await BlogReaction.findOne({
          blogId: userBlogId,
        });

        res
          .status(200)
          .json({ updatedlikeComment, message: "liked", liked: true });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to like/dislike the blog post" });
  }
};

exports.getAllLike = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const findAll = await BlogReaction.findOne({ blogId: blogId });
    if (findAll) {
      res.status(200).json({ findAll, message: "success" });
    } else {
      res.status(404).json({ message: "blog not found" });
    }
  } catch (err) {
    res.status(404).json({ message: "errrrrrr" });
  }
};
