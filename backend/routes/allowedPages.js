const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Role = require('../models/roles'); // Adjust the path as per your project structure
const authToken = require('../middleware/authToken');
const checkAccess = require('../middleware/authPage')
 
router.use(express.json());
 
router.get('/roles/:id', authToken, async (req, res) => {
  
  try {
    const role = await Role.findOne({ _id: req.params.id });
    console.log(role)
 
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
 
    return res.json(role);
  } catch (err) {
    console.error('Error fetching role:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
router.post('/search', authToken, async (req, res) => {
  try {
    let userPattern = new RegExp("^" + req.body.query, 'i'); // 'i' for case-insensitive search
    const roles = await Role.find({ role: { $regex: userPattern } }).select("_id role");
 
    res.json({ roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching for roles.' });
  }
});
 
// Add UUID to allowed pages
router.put('/roles/:id', authToken, async (req, res) => {
  console.log("ihi")
  const { field } = req.body; 

  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (!role.allowedPages.includes(field)) {
      role.allowedPages.push(field);
    }

    await role.save();
    res.status(200).json({ message: "UUID added to allowed pages successfully" });
  } catch (error) {
    console.error("Error adding UUID to allowed pages:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Remove UUID from allowed pages
router.delete('/roles/:id', authToken, async (req, res) => {
  const { field } = req.body; // Expecting the field as the UUID

  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (role.allowedPages.includes(field)) {
      role.allowedPages.pull(field);
    }

    await role.save();
    res.status(200).json({ message: "UUID deleted from allowed pages successfully" });
  } catch (error) {
    console.error("Error deleting UUID from allowed pages:", error);
    res.status(500).json({ error: "Server error" });
  }
});
 
 
 
module.exports = router;