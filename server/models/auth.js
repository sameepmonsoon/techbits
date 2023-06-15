const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    followers: { type: Array, defaultValue: [] },
    following: { type: Array, defaultValue: [] },
    description: { type: String },
    phone: { type: String },
    bookmarks: { type: Array, defaultValue: [] },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
