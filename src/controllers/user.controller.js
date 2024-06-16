const User = require("../models/user.models");

async function createUser(req, res) {}

async function login(req, res) {
  res.send("login working");
}

async function getUserDetails(req, res) {
  res.send("user Details set");
}

module.exports = { createUser, login, getUserDetails };
