const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
    {
        role: { type: String, required: true },
        allowedPages: [{ type: String }]
    }
);

module.exports = mongoose.models.Role || mongoose.model("Role", RoleSchema);
