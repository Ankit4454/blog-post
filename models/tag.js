const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
    timestamps: true,
  }
);

module.exports = {
  Tag,
  sequelize,
};
