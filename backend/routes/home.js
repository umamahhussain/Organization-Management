const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Role = require('../models/roles'); // Adjust the path as per your project structure
const authToken = require('../middleware/authToken');
const checkAccess = require('../middleware/authPage')
 
router.use(express.json());
 
router.get('/home', authToken, checkAccess( '926aa7ca-1a54-4b82-9fac-02108cff6374' ),  async (req, res) => {
    res.status(200).json({ message: 'You have access to this page' });
});
 
 
module.exports = router;