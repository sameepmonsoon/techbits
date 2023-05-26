const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    categoryList: {
      type: JSON,
      required: true,
      unique: true,
    },
    titleContent: {
      type: String,
      required: true,
    },
    editorContent: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
    disLikes: {
      type: Array,
      defaultValue: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogSchema);
