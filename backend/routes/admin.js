const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/imageUpload');

const {
    getAllStories,
    addStory,
    searchStory,
    deletStory,
    editStory,
    adminGetStory,
  } = require('../controllers/stories.controller');

// Add Story
// router.post('/story', isAdmin, addStory);
router.post('/add-story', isAdmin, upload.single('image'), addStory);

// Get all Stories
router.get('/stories', isAdmin, getAllStories);

// Edit Story

// Delete Story

module.exports = router;
