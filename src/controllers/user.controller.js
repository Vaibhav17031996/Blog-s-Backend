const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

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
      return res.status(400).json({
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
    return res.status(200).json({
      status: true,
      message: "User signedup successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "User could not be created, please try again",
      error: err.message,
    });
  }
}

async function login(req, res) {
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
        error: "Email password combination is not correct",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password",
        error: "Email password combination is not correct",
      });
    }
    const authorizationToken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.userName,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      status: true,
      message: "User login successful",
      token: authorizationToken,
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "User login failed, please try again",
      error: err.message,
    });
  }
}

async function getUserDetails(req, res) {
  const id = req.params.userId;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No user found with the user id",
        error: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Could not fetch user details",
      error: err.message,
    });
  }
  /* 
  (My Approach: Review it by yourself)
    if (!id) {
        return res.status(400).json({
        status: false,
        message: "User not found",
        error: "Use id doesn't exist",
        });
    }
    const user = await User.findOne({ id });
    return res.status(200).json({
        status: true,
        message: "User found",
        data: user,
    }); 
  */
}

module.exports = { signup, login, getUserDetails };
