const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Role = require('../models/roles'); // Adjust the path as per your project structure
const authToken = require('../middleware/authToken');
const checkAccess = require('../middleware/authPage')
 
router.use(express.json());
 
router.get('/invoice', authToken, checkAccess( 'f2be7dea-4f07-4cb5-9ecb-b3ca070128a9' ),  async (req, res) => {
    res.status(200).json({ message: 'You have access to this page' });
});
 
 
module.exports = router;