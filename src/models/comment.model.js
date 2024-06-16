const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // ref: userSchema,
    },

    message: {
      type: String,
    },

    like: {
      type: Number,
    },

    isNested: {
      type: Boolean,
    },

    parentComment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
