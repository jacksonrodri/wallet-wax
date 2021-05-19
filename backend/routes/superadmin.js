const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../middleware/isSuperAdmin');

const {
  addAdmin,
  deleteAdmin,
  getAllAdmins,
} = require('../controllers/super.admin.controller');

// Add new admin. (Only Super admin can add/delete admins from the database)
router.post('/add-admin', isSuperAdmin, addAdmin);

// Delete admin
router.delete('/delete-admin/:adminId', isSuperAdmin, deleteAdmin);

// Get list of admins.
router.get('/all-admins', isSuperAdmin, getAllAdmins);

module.exports = router;
