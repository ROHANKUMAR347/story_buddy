const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "storybuddy",
  "avnadmin",
  process.env.DB_PASSWORD,
  {
    host: "mysql-29cd9dfd-rohansethi347-a57d.f.aivencloud.com",
    port: 16598,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    console.error("Error stack:", error.stack);
  }
}
module.exports = { sequelize, connectToDb };
