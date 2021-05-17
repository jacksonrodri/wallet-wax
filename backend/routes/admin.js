const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/imageUpload');

const {
    addStory,
    deletStory,
    editStory,
    adminGetStory,
  } = require('../controllers/admin.controller');

// Add Story
// router.post('/story', isAdmin, addStory);
router.post('/add-story', isAdmin, upload.single('image'), addStory);

// Get Stories
router.get('/story/:storyId', isAdmin, adminGetStory);

// Edit Story
router.put('/edit-story/:storyid', isAdmin, editStory);

// Delete Story
router.delete('/delete-story/:storyId', isAdmin, deletStory);


module.exports = router;
