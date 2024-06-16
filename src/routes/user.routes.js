const express = require("express");
const router = express.Router();
const { createUser, login, getUserDetails } = require("../controllers/user.controller");

// router.route("/")
//     .post(createUser);
router.route("/signUp")
    .post(createUser);

router.route("/login")
    .post(login);

router.route("/:userId")
    .get(getUserDetails);

module.exports = router;
