const jwt = require('jsonwebtoken')
const jwtKey = require('../keys/index')
const mongoose = require('mongoose')
const User = mongoose.model("User")
 
module.exports = ( req, res, next ) => 
{
    try {
        const { authorization } = req.headers;
        
        if ( !authorization ){
            return res.status(401).json({ error: "you must be logged in" })
        }

        const token = authorization.replace("Bearer ", "");

        jwt.verify(token, jwtKey, (err, payload) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: "you must be logged in" });
            }
            
            const {_id } = payload;

            User.findById(_id).then(userdata => {
            req.User = userdata
                next();
            })
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ error:'Internal Server Error' })
    }

}

 