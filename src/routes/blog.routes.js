const express = require("express");
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, likeOrUpdateBlog } = require("../controllers/blog.controller");
const { verifyAndFetchUser } = require("../middlewares/verifyAndFetchUser.middleware");
const { verifyBlogCreator } = require("../middlewares/verifyBlogCreator.middleware");

router.route("/").post(verifyAndFetchUser, createBlog);
router.route("/:blogId").put(verifyAndFetchUser, verifyBlogCreator, updateBlog);
router.route("/:blogId").delete(verifyAndFetchUser, verifyBlogCreator, deleteBlog);
router.route("/:blogId/upvote-downvote/:liking").post(verifyAndFetchUser, likeOrUpdateBlog);

module.exports = router;