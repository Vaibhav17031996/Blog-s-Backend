const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const employeeRouter = require("./employee.routes");

router.use("/user", userRouter);
router.use("/employees", employeeRouter);

module.exports = router;
