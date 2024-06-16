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
