const express = require("express");
const router = express.Router();
const tagController = require("../../controllers/tag_controller");

router.post("/create", tagController.create);
router.post("/update", tagController.update);
router.get("/delete/id", tagController.delete);

module.exports = router;
