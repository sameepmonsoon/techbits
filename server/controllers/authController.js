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
        message: "Welcome to TechBits.",
        token: token,
        ...othersData,
      });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "Wrong password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })

      .status(200)
      .json({ token: token, ...othersData });
  } catch (err) {
    next(err);
  }
};