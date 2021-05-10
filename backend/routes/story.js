var express = require('express');
var router = express.Router();
const upload = require('../middleware/imageUpload');

const {
  getAllStories,
  addStory,
  searchStory,
  deletStory,
  editStory,
} = require('../controllers/stories.controller');

const {
  userLogin,
  getUserAssets,
  verifyUserAssets,
} = require('../controllers/user.controller');

router.post('/login', userLogin);

// Get Assets by User name
router.get('/assets', getUserAssets);

// Get all Stories
router.get('/stories', getAllStories);

// Check user has Asset for the story
router.get('/story/:id', verifyUserAssets);

// Insert New Story
router.post('/add-story', upload.single('image'), addStory);

// Search Story
router.get('/search/story', searchStory);

// Delete story
router.delete('/delete-story', deletStory);

// Edit Story
router.put('/edit-story/:storyid', editStory);

module.exports = router;
