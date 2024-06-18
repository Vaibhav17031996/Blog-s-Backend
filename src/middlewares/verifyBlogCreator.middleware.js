const Blog = require("../models/blog.models");

async function verifyBlogCreator(req, res, next) {
  const userId = req.user._id;
  const blogId = req.params.blogId;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        status: false,
        message: "No blog found with this blog id",
        error: "No blog found with this blog id",
      });
    }
    if (blog.user != userId) {
      return res.status(404).json({
        status: false,
        message: "You do not have the permission for this blog",
        error: "You do not have the permission for this blog",
      });
    }
    req.blog = blog;
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
}

module.exports = { verifyBlogCreator };
