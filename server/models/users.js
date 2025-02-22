const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
        accessLevel: {type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)}
    }
)

module.exports = mongoose.model(`users`, userSchema);