const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const BlacklistToken = sequelize.define("blacklistedToken", {
  _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING, required: true },
});

module.exports = { BlacklistToken };
