const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post_controller");
const isAuthenticated = require("../../middlewares/auth");

router.get("/", postController.getAllPosts);
router.get("/search/:tagName", postController.searchByTagName);
router.post("/filter", postController.filter);
router.post("/create", isAuthenticated, postController.create);
router.post("/update", isAuthenticated, postController.update);
router.get("/delete/:id", isAuthenticated, postController.delete);

module.exports = router;
