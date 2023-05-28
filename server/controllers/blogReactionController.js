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
    } else {
      const existingIndex = findBlog.likes.findindex((like) => like === userId);
      if (existingIndex == -1) {
        findBlog.likes.splice(existingIndex, 1);
      } else {
        findBlog.likes.push(userId);
      }

      await findBlog.save();
      const updatedlikeComment = await BlogReaction.findOne({
        blogId: userBlogId,
      });

      res.status(200).json({ updatedlikeComment, message: "Success" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to like/dislike the blog post" });
  }
};
