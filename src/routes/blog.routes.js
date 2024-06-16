const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blog.controller");

router.route("/").post(createBlog);

module.exports = router;
