const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  //   later: [{
  blog: [
    {
      //   type: mongoose.Schema.Types.ObjectId,
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    },
  ],

  resetPasswordToken: {
    type: String,
  },
  
  resetPasswordExpire: {
    type: String,
  },
});

module.exports = mongoose.model("Tag", userSchema);
