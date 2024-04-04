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
    console.log(`Error while fetching all posts ${error}`);
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
      message: "Posts associated with tag",
    });
  } catch (error) {
    console.log(`Error while searching posts with particular tag ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.filter = (req, res) => {};

module.exports.create = async (req, res) => {
    const {title, content} = req.body;
    
  try {

  } catch (error) {
    console.log(`Error while creating a post ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.update = (req, res) => {};

module.exports.delete = (req, res) => {};
