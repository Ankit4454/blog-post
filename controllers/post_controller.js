const { Post } = require("../models/post");

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({});
    return res.status(200).json({
      success: true,
      data: {
        posts: posts,
      },
      message: "All posts",
    });
  } catch (error) {
    console.log(`Error while creating a user ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.searchByTagName = async (req, res) => {
  try {
    const tagName = req.params.tagName;
    const posts = await Post.findAll({});
    return res.status(200).json({
        success: true,
      data: {
        posts: posts,
      },
      message: "Posts associated with tag"
    });
  } catch (error) {
    console.log(`Error while creating a user ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.filter = (req, res) => {};

module.exports.create = (req, res) => {};

module.exports.update = (req, res) => {};

module.exports.delete = (req, res) => {};
