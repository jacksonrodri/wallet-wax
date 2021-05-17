var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middleware/auth');

const {
  getAllStories,
  searchStory
} = require('../controllers/stories.controller');

const {
  userLogin,
  getUserAssets,
  verifyUserAssets,
} = require('../controllers/user.controller');

router.post('/login', userLogin);

// Get All stories
router.get('/stories', isAuthenticated, getAllStories);

// Get Assets by User name
router.get('/assets', isAuthenticated, getUserAssets);

// Check user has Asset for the story
router.get('/story/:id', isAuthenticated, verifyUserAssets);

// Search Story
router.get('/search/story', isAuthenticated, searchStory);


module.exports = router;
