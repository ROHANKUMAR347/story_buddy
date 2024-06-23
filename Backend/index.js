const express = require("express");
const { connectToDb, sequelize } = require("./config/db");
const authRoutes = require("./routes/userauth");
const storyroute = require("./routes/story.route");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
sequelize.sync();
require("dotenv").config();
app.use("/auth", authRoutes);
app.use("/story", storyroute);
app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.listen(3000, async () => {
  await connectToDb();
  console.log("Server is running on port 3000");
});
