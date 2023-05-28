const BlogReaction = require("../models/blogReaction.js");

exports.like = async (req, res) => {
  try {
    const userBlogId = req.body.blogId;
    const userId = req.body.userId;

    let findBlog = await BlogReaction.findOne({ blogId: userBlogId });

    if (!findBlog) {
      findBlog = new BlogReaction({ blogId: userBlogId, likes: [userId] });
      await findBlog.save();
      res
        .status(200)
        .json({ updatedlikeComment: findBlog, message: "Success liked" });
    } else {
      const existingIndex = findBlog.likes.indexOf(userId);

      if (existingIndex !== -1) {
        findBlog.likes.splice(existingIndex, 1);
        await findBlog.save();
        res
          .status(200)
          .json({
            updatedlikeComment: findBlog,
            message: "Like removed",
            liked: false,
          });
      } else {
        findBlog.likes.push(userId);
        await findBlog.save();
        res
          .status(200)
          .json({
            updatedlikeComment: findBlog,
            message: "liked",
            liked: true,
          });
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
