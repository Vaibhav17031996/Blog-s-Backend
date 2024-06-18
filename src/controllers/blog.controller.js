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
  // update the blog with the new data
  // get the newly created blog
  // compare old & new tags to find delta
  // remove the blogId from deleted tags
  // add the blogId on the newly added tags
  if(title)
}

module.exports = { createBlog, updateBlog };
