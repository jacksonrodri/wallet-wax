const Story = require('../models/stories');

const addStory = async (req, res) => {
  const newStory = new Story({
    name: req.body.name,
    content: req.body.content,
    assetIds: req.body.assetIds,
    description: req.body.description,
    image: req.file.originalname,
  });
  try {
    const S = await newStory.save();
    res.json(S);
  } catch (err) {
    res.status(401).status({ message: err });
  }
};

const deletStory = async (req, res) => {
  try {
    const storyId = await Story.findById(req.params.storyId);
    // console.log(storyId)

    if (storyId != null) {
      var deleteQuery = { _id: storyId };
      Story.deleteOne(deleteQuery, (err) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: `${storyId.name} is deleted successfully` });
      });
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (err) {
    res.status(204).json({ message: err });
  }
};

const editStory = async (req, res) => {
  try {
    const storyId = req.params.storyid;

    const { name, content, assetIds, description } = req.body;
    const fields = {
      name,
      content,
      assetIds,
      description,
    };

    console.log('values', fields);
    const result = await Story.updateOne(
      { _id: storyId },
      { $set: { ...fields } }
    );

    // console.log(result);
    res.status(200).json({ message: `${result.name} is Updated successfully` });
  } catch (err) {
    res.status(204).json({ message: err });
  }
};

const adminGetStory = async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.storyId });
    console.log(story);
    res.json(story);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = {
  addStory,
  deletStory,
  editStory,
  adminGetStory,
};
