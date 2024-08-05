const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const { validateBody } = require('../utils');
const { bodyValidator } = require('../config');
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const {jwtKey} = require('../keys/index')
const authorized_token = require('../middleware/authToken')
 
router.use(express.json());
 
router.post('/signup', async(req, res) => {
 
    const requiredFields = bodyValidator['signup']
    const missingFields = validateBody(req.body, requiredFields);
 
    if (missingFields.length) {
        console.log(missingFields.length)
        return res.json({
            error: `missing fields ${missingFields.join(', ')}`,
            statusCode: 403
        })
    }
    else{
        try {
           
            const username = req.body.username;
            const user = await User.findOne({ username });
 
            if (user) {
                return res.json({error:"User already exists"});
            }    
 
            const newUser = new User({ ...req.body });
            await newUser.save()
            return res.json({ statusCode: 200, message:"User Details Saved Successfully" });
        }
        catch ({ message }) {
            res.json({ message  })
        }
    }
})
 
 
router.post('/login', async (req, res) => {
    const requiredFields = bodyValidator['login'];
    const missingFields = validateBody(req.body, requiredFields);
 
    if (missingFields.length) {
        return res.status(403).json({
            error: `Missing fields: ${missingFields.join(', ')}`,
            statusCode: 403
        });
    }
 
    const { username, password } = req.body;
 
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid Username/Password" });
        }
 
        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid Username/Password" });
        }
 
        const token = jwt.sign({ _id: user._id }, jwtKey);
        const { _id, role } = user;
        return res.json({ token, user: { _id, username, role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
 
module.exports=router