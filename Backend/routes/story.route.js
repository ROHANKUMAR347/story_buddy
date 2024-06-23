const express = require("express");
const router = express.Router();
const storyController = require("../controller/storyController");
const { authenticateUser } = require("../middlewere/auth.middlewere");
router.get(
  "/userstory/",
  authenticateUser,
  storyController.getStoriesForLoggedInUser
);
router.post("/add", authenticateUser, storyController.createStory);
router.get("/", storyController.getAllStory);
router.get("/:id", storyController.getStoryById);

router.put("/:id", authenticateUser, storyController.updateStory);
router.delete("/:id", authenticateUser, storyController.deleteStory);

module.exports = router;
