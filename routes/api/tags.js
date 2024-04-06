const express = require("express");
const router = express.Router();
const tagController = require("../../controllers/tag_controller");
const isAuthenticated = require("../../middlewares/auth");

router.post("/create", isAuthenticated, tagController.create);
router.post("/update", isAuthenticated, tagController.update);
router.get("/delete/:id", isAuthenticated, tagController.delete);

module.exports = router;
