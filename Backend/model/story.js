// models/Story.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user");

const Story = sequelize.define("Story", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  story_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dateofPublish: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Associate Story with User
Story.belongsTo(User);

module.exports = Story;
