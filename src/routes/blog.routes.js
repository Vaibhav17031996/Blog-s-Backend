const express = require("express");
const router = express.Router();
const { createBlog, updateBlog } = require("../controllers/blog.controller");
const { verifyAndFetchUser } = require("../middlewares/verifyAndFetchUser.middleware");
const { verifyBlogCreator } = require("../middlewares/verifyBlogCreator.middleware");

router.route("/").post(verifyAndFetchUser, createBlog);
router.route("/:blogId").put(verifyAndFetchUser, verifyBlogCreator, updateBlog);

module.exports = router;
