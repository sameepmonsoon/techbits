const express = require("express");
const { like } = require("../controllers/blogReactionController.js");

const router = express.Router();

router.post("/like", like);
// router.post("/signin", signin);
// router.put("/bookmark", bookmark);

module.exports = router;
