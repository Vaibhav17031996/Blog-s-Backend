const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },

    description: {
      type: String,
      required: true,
      minLength: 3,
    },

    tag: {
      type: [String],
      default: ["General"], // it cannot be like this 'General', bcz here type is array, so it should also be an array
      required: true,
    },

    imageURL: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    userName: {
      type: String,
    },

    upVote: {
      type: Number,
      default: 0,
      required: true,
    },

    downVote: {
      type: Number,
      default: 0,
      required: true,
    },

    votedBy: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    // Aliter
    // votedBy: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "User",
    // },

    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
