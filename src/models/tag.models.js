const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },

  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

module.exports = mongoose.model("Tag", tagSchema);

if (tag?.length > 0) {
  for (const tagValue of tag) {
    let existingTag = await Tag.findOne({ categoryName: tagValue });

    if (existingTag) {
      // If tag exists, just update it
      existingTag.category.push(newBlogPost._id);
      await existingTag.save();
    } else {
      // Only create new tag if not found
      await Tag.create({
        categoryName: tagValue,
        category: [newBlogPost._id],
      });
    }
  }
}
