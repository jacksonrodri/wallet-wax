const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

// Add Story
router.post('/story', isAuthenticated, (req, res) => {});

// Get Stories

// Edit Story

// Delete Story
