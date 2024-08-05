const jwt = require('jsonwebtoken')
const {jwtKey} = require('../keys/index')
const mongoose = require('mongoose')
const User = mongoose.model("User")
 
module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
       
        if (!authorization) {
            return res.status(401).json({ error: "You must be logged in" });
        }
 
        const token = authorization.replace("Bearer ", "");
 
        jwt.verify(token, jwtKey, (err, payload) => {
            if (err) {
                console.error('JWT verification error:', err.message);
                return res.status(401).json({ error: "Unauthorized: Invalid token" });
            }
           
            const { _id } = payload;
 
            User.findById(_id).then(userdata => {
                if (!userdata) {
                    return res.status(401).json({ error: "User not found" });
                }
                req.user = userdata;
                next();
            }).catch(err => {
                console.error('Error finding user:', err);
                return res.status(500).json({ error: "Server error" });
            });
        });
    } catch (error) {
        console.error('Middleware error:', error);
        return res.status(500).json({ error: "Server error" });
    }
}
