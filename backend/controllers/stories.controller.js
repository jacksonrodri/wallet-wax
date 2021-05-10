const Story = require('../models/stories');

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();

    res.status(200).json(stories);
  } catch (err) {
    console.log(err);
    // res.send("Error", err)
    res.status(401).json({ Message: err });
  }
};

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
    // res.send("Error", err)
    res.status(401).status({ message: err });
  }
};

const searchStory = async (req, res) => {
  try {
    const s = await Story.find({
      name: { $regex: req.params.query, $options: 'i' },
    });
    res.json(s);
  } catch (err) {
    res.status(404).status({ message: err });
    // res.send("Error"+ err)
  }
};

const deletStory = async (req, res) => {
  try {
    const storyId = await Story.findById(req.body.storyid);
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
    console.log(fields);
    const result = await Story.findByIdAndUpdate(storyId, fields);
    console.log(result);

    res.status(200).json({ message: `${result.name} is Updated successfully` });
  } catch (err) {
    res.status(204).json({ message: err });
  }
};

module.exports = {
  getAllStories,
  addStory,
  searchStory,
  deletStory,
  editStory,
};
