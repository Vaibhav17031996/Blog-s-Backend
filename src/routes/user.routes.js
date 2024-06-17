const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserDetails,
} = require("../controllers/user.controller");

// router.route("/")
//     .post(signup);
router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/:userId").get(getUserDetails);

module.exports = router;
