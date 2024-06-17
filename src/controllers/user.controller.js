const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user.models");

async function signup(req, res) {
  const { userName, password, email } = req.body;
  try {
    /* 
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      res.status(400).json({
        status: false,
        message: "User already exists with the current Email",
        error: "User already exists with the current Email",
      });
    } 
    */
    const isUserPresent = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (isUserPresent) {
      res.status(400).json({
        status: false,
        message: "User already exists",
        error: "User already exists",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, saltRounds);
    // const newUser = await User.create({ userName, password, email });
    const newUser = await User.create({
      userName,
      password: cryptedPassword,
      email,
    });
    res.status(200).json({
      status: true,
      message: "User signedup successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: false,
      message: "User could not be created, please try again",
      error: err.message,
    });
  }
}

async function login(req, res) {
  res.send("login working");
}

async function getUserDetails(req, res) {
  res.send("user Details set");
}

module.exports = { signup, login, getUserDetails };
