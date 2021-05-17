const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
// Add Story
router.post('/story', isAdmin, () => {});

// Get Stories

// Edit Story

// Delete Story

module.exports = router;
