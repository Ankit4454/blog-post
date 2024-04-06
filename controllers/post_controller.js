const { Post } = require("../models/post");
const { PostTag } = require("../models/postTag");
const { Tag } = require("../models/tag");
const { User } = require("../models/user");
const { Sequelize, Op } = require("sequelize");
const sequelize = require("../config/sequelize");

const textValidator = /[<>\$"'`;^]/;

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
    const posts = await Post.findAll({
      include: [
        {
          model: Tag,
          where: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Tags.tagName")),
            "LIKE",
            `%${tagName.toLowerCase()}%`
          ),
        },
      ],
    });
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

module.exports.filter = async (req, res) => {
  try {
    const { startDate, endDate, authorName, tags } = req.body;
    let whereClause = "1 = 1";

    if (authorName) {
      whereClause += ` AND B.name LIKE '%${authorName}%'`;
    }

    if (tags) {
      const tagNames = tags.split(",");
      const tagConditionsArray = tagNames.map(
        (tag) => `D.tagName LIKE '%${tag}%'`
      );
      const tagConditions = tagConditionsArray.join(" OR ");
      whereClause += ` AND (${tagConditions})`;
    }

    if (startDate && endDate) {
      whereClause += ` AND A.createdAt BETWEEN date('${startDate}') AND date('${endDate}')`;
    }

    const query = `
        SELECT
            A.id,
            A.title,
            A.content,
            B.name,
            GROUP_CONCAT(D.tagName) AS tagNames
        FROM
            Posts as A
        INNER JOIN
            Users as B ON A.authorId = B.id
        LEFT JOIN
            PostTags as C ON C.postId = A.id
        LEFT JOIN
            Tags as D ON D.id = C.tagId 
        WHERE
            ${whereClause}
        GROUP BY
            A.id;
    `;

    const filteredPosts = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json({
      success: true,
      data: {
        posts: filteredPosts,
      },
      message: "Filtered posts",
    });
  } catch (error) {
    console.log(`Error while filtering posts ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.create = async (req, res) => {
  const { title, content } = req.body;
  if (textValidator.test(title) || textValidator.test(content)) {
    return res.status(400).json({
      error: true,
      message: "Special characters are not allowed",
    });
  }

  try {
    const post = await Post.create({
      title: title,
      content: content,
      authorId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      data: {
        post: post,
      },
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(`Error while creating a post ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.update = async (req, res) => {
  const { id, title, content } = req.body;
  if (textValidator.test(title) || textValidator.test(content)) {
    return res.status(400).json({
      error: true,
      message: "Special characters are not allowed",
    });
  }

  try {
    const postAuthor = await Post.findOne({
      where: { id: id, authorId: req.user.id },
    });
    if (!postAuthor) {
      return res.status(404).json({
        error: true,
        message: "Post not found",
      });
    }
    const [updatedPost, updatedRows] = await Post.update(
      { title: title, content: content },
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
          post: {
            ...postAuthor.dataValues,
            title: title,
            content: content,
            updatedAt: new Date().toISOString(),
          },
        },
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    console.log(`Error while updating a post ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.delete = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }
  try {
    const postId = req.params.id;
    const deletedPostRows = await Post.destroy({
      where: {
        id: postId,
      },
    });
    const deletedPostTagRows = await PostTag.destroy({
      where: {
        postId: postId,
      },
    });
    if (deletedPostRows === 1) {
      return res.status(200).json({
        success: true,
        data: {
          deletedRows: deletedPostRows,
        },
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    console.log(`Error while deleting a post ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
