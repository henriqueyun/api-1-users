const { Router } = require("express");
const router = Router();

const healthController = require("./health-controller");

router.get("/", healthController.check);

module.exports = router;