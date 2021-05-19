const Story = require('../models/stories');

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    console.log(err);
    res.status(401).json({ Message: err });
  }
};

const searchStory = async (req, res) => {
  try {
    const s = await Story.find({
      name: { $regex: req.query.query || '', $options: 'i' },
    });
    res.json(s);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports = {
  getAllStories,
  searchStory
};
