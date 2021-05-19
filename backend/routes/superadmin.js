const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../middleware/isSuperAdmin');

// Add new admin. (Only Super admin can add/delete admins from the database)
router.post('/add-admin', isSuperAdmin, (req, res) => {
  const { username } = req.body;
});

// Delete admin
router.get('/delete-admin/:adminId', isSuperAdmin, (req, res) => {
  const { adminId } = req.params;

  // adminId === _id
});

// Get list of admins.
router.get('/all-admins', isSuperAdmin);

module.exports = router;
