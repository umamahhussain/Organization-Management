const Role = require('../models/roles'); // Adjust the path as per your project structure
 
const checkAccess = (requiredPage) => async (req, res, next) => {
    try {
        const userRole = req.user.role; // Retrieve the user's role from req.user
        const role = await Role.findOne({ role: userRole });
 
        if (!role) {
            return res.status(403).json({ error: "Role not found" });
        }
 
        if (role.allowedPages.includes(requiredPage)) {
            next();
        } else {
            res.status(403).json({ error: "Access denied" });
        }
    } catch (error) {
        console.error("Error checking access:", error);
        res.status(500).json({ error: "Server error" });
    }
};
 
module.exports = checkAccess;
 
 
 
 