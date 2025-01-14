const express = require("express");
const port = 8000;
const app = express();
const sequelize = require("./config/sequelize");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use("/", require("./routes"));

const initApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: false});
    app.listen(port, (err) => {
      if (err) {
        return console.log(`Error while running server: ${err}`);
      }
      console.log(`Server is up & running on port: ${port}`);
      console.log(`Connected to Database: sqlite`);
    });
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
};

initApp();
