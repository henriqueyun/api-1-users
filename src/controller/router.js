const { Router } = require("express");
const router = Router();

const userRouter = require("./user/user-router");
router.use("/user", userRouter);

const healthRouter = require("./health/health-router");
router.use("/health", healthRouter);

module.exports = router;