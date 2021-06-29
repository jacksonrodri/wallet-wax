const Story = require('../models/stories');

const addStory = async (req, res) => {
  const templateIdsArr = req.body.assetIds.split(',');
  let cleanTemplateIds = [];
  templateIdsArr.forEach((assetId) => {
    if (assetId !== '') {
      cleanTemplateIds.push(assetId);
    }
  });

  const newStory = new Story({
    name: req.body.name,
    content: req.body.content,
    templateIds: cleanTemplateIds.join(','),
    description: req.body.description,
    image: req.file.originalname,
  });
  try {
    const S = await newStory.save();
    console.log(S)
    res.json(S);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const deletStory = async (req, res) => {
  try {
    const storyId = await Story.findById(req.params.storyId);
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

    const { name, content, templateIds, description } = req.body;

    const templateIdsArr = req.body.assetIds.split(',');
    let cleanTemplateIds = [];
    templateIdsArr.forEach((assetId) => {
      if (assetId !== '') {
        cleanTemplateIds.push(assetId);
      }
    });

    const fields = {
      name,
      content,
      templateIds: cleanTemplateIds.join(','),
      description,
    };

    const result = await Story.updateOne(
      { _id: storyId },
      { $set: { ...fields } }
    );

    res.status(200).json({ message: `${result.name} is Updated successfully` });
  } catch (err) {
    res.status(204).json({ message: err });
  }
};

const adminGetStory = async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.storyId });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = {
  addStory,
  deletStory,
  editStory,
  adminGetStory,
};
