const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post_controller");

router.get("/search/:tagName", postController.searchByTagName);
router.post("/filter", postController.filter);
router.post("/create", postController.create);
router.post("/update", postController.update);
router.post("/delete", postController.delete);

module.exports = router;
