const { Router } = require("express");
const router = Router();

const userController = require("./user-controller");

router.post("/", userController.save);
router.get("/:id", userController.find);
router.patch("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;