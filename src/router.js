const { Router } = require("express");
const router = Router();

const userRouter = require("./controller/user-router");
router.use("/user", userRouter);

module.exports = router;