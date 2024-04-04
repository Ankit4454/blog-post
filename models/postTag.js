const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { Post } = require("./post");
const { Tag } = require("./tag");

const PostTag = sequelize.define(
  "PostTag",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    indexes: [
      { unique: true, fields: ["id"] },
      { unique: true, fields: ["postId", "tagId"] },
    ],
    timestamps: true,
  }
);

Post.belongsToMany(Tag, { through: PostTag, foreignKey: "postId" });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: "tagId" });

module.exports = {
  PostTag,
  sequelize,
};
