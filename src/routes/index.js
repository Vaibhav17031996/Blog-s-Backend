const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const blogRouter = require("./blog.routes");

router.use("/user", userRouter);
router.use("/blog", blogRouter);

module.exports = router;
