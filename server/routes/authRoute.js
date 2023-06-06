const express = require("express");
const {
  signin,
  signup,
  bookmark,
  follow,
  getAllBookmark,
  updateProfile,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/bookmark", bookmark);
router.post("/getBookmark", getAllBookmark);
router.put("/follow", follow);
router.put("/updateProfile", updateProfile);
// router.put("/update", update);
// router.post("/reset-password", resetPassword);

module.exports = router;
