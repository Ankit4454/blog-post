const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Blog_Post", "root", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "database.sqlite",
});

module.exports = sequelize;
