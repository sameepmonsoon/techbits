const User = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    // Check if the user already exists
    const existingUserName = await User.findOne({
      username: req.body.username,
    });
    const existingUserEmail = await User.findOne({ email: req.body.email });

    if (existingUserName) {
      return res.status(400).json({
        error: "Username is already taken. Please choose a different username.",
      });
    } else if (existingUserEmail) {
      return res
        .status(400)
        .json({ error: "The email address you provided is already in use." });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT);

    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        token: token,
        ...othersData,
        message: "Welcome to the TechBits.",
      });
  } catch (err) {
    next(err);
  }
};
exports.signin = async (req, res, next) => {
  try {
    const userInput = req.body.email;
    const userWithUsername = await User.findOne({ username: userInput });
    const userWithEmail = await User.findOne({ email: userInput });

    if (!userWithUsername && !userWithEmail) {
      return res.status(404).json({ error: "User Not Found." });
    }

    const user = userWithUsername || userWithEmail;
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return res.status(404).json({ error: "Wrong Password." });
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT);
    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        token: token,
        ...othersData,
        message: "Welcome to the TechBits.",
      });
  } catch (err) {
    next(err);
  }
};

exports.bookmark = async (req, res) => {
  try {
    const userId = req.body.userId;
    const blogId = req.body.blogId;
    const userFound = await User.findOne({ _id: userId });

    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!userFound.bookmarks) {
      userFound.bookmarks = [];
    }

    const bookmarkIndex = userFound.bookmarks.indexOf(blogId);

    if (bookmarkIndex !== -1) {
      userFound.bookmarks.splice(bookmarkIndex, 1);
      await userFound.save();
      const updatedUser = await User.findOne({ _id: userId });

      res
        .status(200)
        .json({ updatedUser, message: "Bookmark Removed", bookmarked: false });
    } else {
      userFound.bookmarks.push(blogId);
      await userFound.save();
      const updatedUser = await User.findOne({ _id: userId });

      res
        .status(200)
        .json({ updatedUser, message: "Bookmarked", bookmarked: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Bookmark failed" });
  }
};
exports.getAllBookmark = async (req, res) => {
  try {
    const getAll = await User.find({}, "bookmarks");
    res.status(200).json({ getAll, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Bookmark failed" });
  }
};

//optimized by gpt
exports.follow = async (req, res) => {
  try {
    const { userId, followerId } = req.body;
    const [userFound, followedBy] = await Promise.all([
      User.findById(userId),
      User.findById(followerId),
    ]);

    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = followedBy.following?.includes(userId);
    const isFollower = userFound.followers?.includes(followerId);

    if (isFollowing) {
      followedBy.following = followedBy.following.filter((id) => id !== userId);
    } else {
      followedBy.following.push(userId);
    }

    if (isFollower) {
      userFound.followers = userFound.followers.filter(
        (id) => id !== followerId
      );
    } else {
      userFound.followers.push(followerId);
    }
    const updatedFollowList = await followedBy.save();
    await userFound.save();

    res.status(200).json({ updatedFollowList, message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update following status" });
  }
};
