const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phone: String,
        isAdmin: Boolean
    }
)

module.exports = mongoose.model(`users`, userSchema);