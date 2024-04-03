const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Blog_Post", "root", "", {
  host: "localhost",
  dialect: "sqlite",
});

module.exports = sequelize;
