const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("./user");

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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
    timestamps: true,
  }
);

Tag.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  Tag,
  sequelize,
};
