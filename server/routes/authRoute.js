const express = require("express");
const { signin, signup ,bookmark} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/bookmark", bookmark);
// router.put("/update", update);
// router.post("/reset-password", resetPassword);

module.exports = router;
