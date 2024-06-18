const Blog = require("../models/blog.models");
const User = require("../models/user.models");
const Tag = require("../models/tag.models");

async function createBlog(req, res) {
  const userId = req.user._id;
  const { title, description, tag, imageURL } = req.body;
  const documentObject = {};
  if (tag) documentObject.tag = tag;
  if (imageURL) documentObject.imageURL = imageURL;

  try {
    // 1. Validating the user from userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong",
        error: "Something went wrong",
      });
    }
    // 2. creation of new blog post
    const newBlogPost = await Blog.create({
      ...documentObject,
      title,
      description,
      user: user._id, // (or) user: userId, both are same
      votedBy: [],
      userName: user.userName,
      upVote: 0,
      downVote: 0,
      comments: [],
      // Why we are not adding tag & image here? -> bcz tag & image are not required at the time of creating the blog. That's the reason we've written the extra code (line 8-9 -> if (tag) documentObject.tag = tag; if (imageURL) documentObject.imageURL = imageURL;)
    });
    // => Iterating over tags
    // 3. check if the tags are present in the DB
    // 4. if they are present, append the blogId
    // 5. if they are not present, create them and then append the blogId
    if (tag?.length > 0) {
      tag.forEach(async (tagValue) => {
        const existingTag = await Tag.findOne({ categoryName: tagValue });
        if (existingTag) {
          existingTag.category.push(newBlogPost._id);
          await existingTag.save();
        }
        const newTag = await Tag.create({
          categoryName: tagValue,
          category: [newBlogPost._id],
        });
      });
    }
    return res.status(200).json({
      status: true,
      message: "Blog successful created",
      data: newBlogPost,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Could not create the blog",
      error: err.message,
    });
  }
}

async function updateBlog(req, res) {
  const { title, description, tag, imageURL } = req.body;
  const oldTags = req.blog.tag;
  const blogId = req.blog._id;
  /* 
    update the blog with the new data
    get the newly created blog
    compare old & new tags to find delta
    remove the blogId from deleted tags
    add the blogId on the newly added tags 
  */
  try {
    // 1. update the blog with the new data
    await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      tag,
      imageURL,
    });
    // 2. Iterating over old tags
    oldTags.forEach(async (tagEntry) => {
      const tagDocument = await Tag.findOne({ categoryName: tagEntry });
      if (tagDocument) {
        tagDocument.category.pull(blogId);
        await tagDocument.save();
      }
    });
    tag.forEach(async (tagEntry) => {
      const tagDocument = await Tag.findOne({ categoryName: tagEntry });
      if (tagDocument) {
        tagDocument.category.push(blogId);
        await tagDocument.save();
      } else {
        const newTag = await Tag.create({
          categoryName: tagEntry,
          category: [blogId],
        });
      }
    });
    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Could not create the blog",
      error: err.message,
    });
  }
}

async function deleteBlog(req, res) {
  // delete the blog
  // remove the tags associated with the blogId
  const blogId = req.blog._id;
  try {
    const deletedBlog = await Blog.findByIdAndUpdate(blogId);
    deletedBlog.tag.forEach(async (tagEntry) => {
      const tagDocument = await Tag.findOne({ categoryName: tagEntry });
      if (tagDocument) {
        tagDocument.category.pull(blogId);
        await tagDocument.save();
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Could not delete the blog",
      error: err.message,
    });
  }
}

async function likeOrUpdateBlog(req, res) {
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

    if (blog.votedBy && blog.votedBy.length > 0) {
      const isUserPresent = blog.votedBy.find((entry) => entry == userId);
      if (isUserPresent) {
        return res.status(400).json({
          status: false,
          message: "User has already voted before",
        });
      }
    }

    if (req.params.liking) {
      blog.upVote = blog.upvote + 1;
      blog.votedBy = [];
      blog.votedBy = blog.votedBy.push(userId);
      await blog.save();
    } else {
      blog.downVote = blog.downvote + 1;
      blog.votedBy = [];
      blog.votedBy = blog.votedBy.push(userId);
      await blog.save();
    }
    return res.status(200).json({
      status: true,
      message: "Liking successfully done",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Could not delete the blog",
      error: err.message,
    });
  }
}

module.exports = { createBlog, updateBlog, deleteBlog, likeOrUpdateBlog };
