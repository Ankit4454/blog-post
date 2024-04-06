const { Tag } = require("../models/tag");
const { PostTag } = require("../models/postTag");
const { Post } = require("../models/post");

const textValidator = /[<>\$"'`;^]/;

module.exports.create = async (req, res) => {
  const { tagName, postId } = req.body;
  if (textValidator.test(tagName)) {
    return res.status(400).json({
      error: true,
      message: "Special characters are not allowed",
    });
  }

  try {
    const postAuthor = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if(!postAuthor){
        return res.status(404).json({
            error: true,
            message: "Post not found"
        });
    }
    const tag = await Tag.create({ tagName: tagName, userId: req.user.id });
    const postTag = await PostTag.create({ postId: postId, tagId: tag.id });

    return res.status(201).json({
      success: true,
      data: {
        tag: tag,
      },
      message: "Tag created successfully",
    });
  } catch (error) {
    console.log(`Error while creating a tag ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.update = async (req, res) => {
  const { id, tagName } = req.body;
  if (textValidator.test(tagName)) {
    return res.status(400).json({
      error: true,
      message: "Special characters are not allowed",
    });
  }

  try {
    const tagUser = await Tag.findOne({
      where: { id: id, userId: req.user.id },
    });
    if (!tagUser) {
      return res.status(404).json({
        error: true,
        message: "Tag not found",
      });
    }
    const [updatedTag, updatedRows] = await Tag.update(
      { tagName: tagName },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    if (updatedRows === 1) {
      return res.status(200).json({
        success: true,
        data: {
          tag: {
            ...tagUser.dataValues,
            tagName: tagName,
            updatedAt: new Date().toISOString(),
          },
        },
        message: "Tag updated successfully",
      });
    }
  } catch (error) {
    console.log(`Error while updating a tag ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const tagId = req.params.id;
    const tagUser = await Tag.findOne({
      where: {
        id: tagId,
        userId: req.user.id,
      },
    });
    if (!tagUser) {
      return res.status(404).json({
        error: true,
        message: "Tag not found",
      });
    }
    const deletedTagRows = await Tag.destroy({
      where: {
        id: tagId,
      },
    });
    const deletedPostTagRows = await PostTag.destroy({
      where: {
        tagId: tagId,
      },
    });
    if (deletedTagRows === 1) {
      return res.status(200).json({
        success: true,
        data: {
          deletedRows: deletedTagRows,
        },
        message: "Tag deleted successfully",
      });
    }
  } catch (error) {
    console.log(`Error while deleting a tag ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
