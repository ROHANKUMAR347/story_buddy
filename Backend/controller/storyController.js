const Story = require("../model/story");
const User = require("../model/user");

const createStory = async (req, res) => {
  try {
    const { title, category, image, story_description } = req.body;

    if (!title || !category || !image || !story_description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const story = await Story.create({
      title,
      category,
      image,
      story_description,
      dateofPublish: new Date(), // Set dateofPublish to current date and time
      UserId: req.user.id, // Assign the logged-in user's ID to the story
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStory = async (req, res) => {
  try {
    const storys = await Story.findAll();
    res.status(200).json(storys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByPk(id);
    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ error: "story not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStory = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    // Validate if id is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid story id" });
    }

    const { title, story_description, image, category } = req.body;

    // Query for the story using the validated id
    const story = await Story.findByPk(id);

    // Check if the story exists
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Check if the authenticated user is the owner of the story
    if (story.UserId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update the story
    await story.update({
      title,
      story_description,
      image,
      category,
    });

    // Respond with the updated story
    res.status(200).json(story);
  } catch (error) {
    console.error("Error updating story:", error);
    res.status(500).json({ error: error.message });
  }
};
const deleteStory = async (req, res) => {
  try {
    const { id } = req.query;
    const story = await Story.findOne({ where: { id } });

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Check if the authenticated user is the owner of the story
    if (story.UserId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete the story
    await story.destroy();

    // Respond with a success message
    res.status(204).json({ message: "Story deleted" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ error: "Failed to delete story" });
  }
};

const getStoriesForLoggedInUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const stories = await Story.findAll({
      where: {
        UserId: loggedInUserId,
      },
      include: [
        {
          model: User, // Make sure User model is correctly imported
          attributes: ["username", "email"], // Include User's username, email, and ID
        },
      ],
    });

    res.json(stories);
    stories.forEach((story) => {
      console.log(story.id);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStory,
  getAllStory,
  getStoryById,
  updateStory,
  deleteStory,
  getStoriesForLoggedInUser,
};
