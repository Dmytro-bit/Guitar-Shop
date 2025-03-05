const mongoose = require('mongoose');
const {MEDIA_DIR} = require("../server");

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*¬`@=)(-_:;'{}/\\ \[\].,<>?~|]).{8,}$/
const phonePattern = /^\+3538\d\d{3,4}\d{4}$/;
const namePattern = /^[a-zA-Z ]{2,30}$/;

let userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: [true, "First name is required"],
            match: [namePattern, "Invalid name format"],
            trim: true
        },
        lname: {
            type: String,
             required: [true, "Last name is required"],
            match: [namePattern, "Invalid name format"],
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email is required"],
            match: [emailPattern, "Invalid email format"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            match: [passwordPattern, "Invalid password"]
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            match: [phonePattern, "Invalid phone format"],
            trim: true
        },
        accessLevel: {
            type: Number,
            default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
            min: [0, "Access level must be a positive number"],
            max: [2, "Access level does not exist"]
        },
        address: {
            fline: {type: String, default: ""},
            sline: {type: String, default: ""},
            city: {type: String, default: ""},
            county: {type: String, default: ""},
            eircode: {type: String, default: ""}
        },
        profilePhotoUrl: {type: String, get: v => `${MEDIA_DIR}${v}`, default: "../icons/user.png"},
    }
)

module.exports = mongoose.model(`users`, userSchema);