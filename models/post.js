const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("./user");
const { Tag } = require("./tag");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
    timestamps: true,
  }
);

Post.belongsTo(User, { foreignKey: "authorId" });

module.exports = {
  Post,
  sequelize,
};
