const router = require("express").Router();

const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");

// ===========================================================================================================================
// ============================================ Validation check =============================================================
// ===========================================================================================================================

function validateUserLoginInput(req, res, next) {
    try {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


        const {email, password} = req.body;
        const errors = [];


        if (!email || typeof email !== 'string' || email.trim() === '') {
            errors.push('Email is required and must be a valid email address.');
        }
        if (!password || typeof password !== 'string') {
            errors.push('Password is required.');
        }


        if (errors.length === 0) {
            const trimmedEmail = email.trim();

            if (!emailPattern.test(trimmedEmail)) {
                errors.push('Invalid email format.');
            }
        }

        if (errors.length > 0) {
            return res.status(400).send({errors: errors})
        }

        next();
    } catch (err) {
        next(err)
    }
}


function validateUserRegistrationInput(req, res, next) {
    try {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*¬`@=)(-_:;'{}/\\ \[\].,<>?~|]).{8,}$/
        const phonePattern = /^\+3538\d\d{3,4}\d{4}$/;
        const namePattern = /^[a-zA-Z ]{2,30}$/;

        const {fname, lname, email, phone, password, confirmPassword} = req.body;
        const errors = [];

        if (!fname || typeof fname !== 'string' || fname.trim() === '') {
            errors.push('First name is required and must be a non-empty string.');
        }
        if (!lname || typeof lname !== 'string' || lname.trim() === '') {
            errors.push('Last name is required and must be a non-empty string.');
        }
        if (!email || typeof email !== 'string' || email.trim() === '') {
            errors.push('Email is required and must be a valid email address.');
        }
        if (!password || typeof password !== 'string') {
            errors.push('Password is required.');
        }
        if (!confirmPassword || typeof confirmPassword !== 'string') {
            errors.push('Confirm Password is required.');
        }

        if (errors.length === 0) {
            // Sanitize input by trimming whitespace
            const trimmedEmail = email.trim();
            const trimmedPhone = phone.trim();
            const trimmedName = fname.trim();
            const trimmedLname = lname.trim();
            // --- Length & Whitelist Constraints ---

            if (trimmedName.length < 2 || trimmedName.length > 30) {
                errors.push('First name must be between 2 and 30 characters.');
            }
            if (trimmedLname.length < 2 || trimmedLname.length > 30) {
                errors.push('Last name must be between 2 and 30 characters.');
            }

            if (!namePattern.test(trimmedName)) {
                errors.push('Username can only contain letters and whitespace characters.');
            }
            if (!namePattern.test(trimmedLname)) {
                errors.push('Username can only contain letters and whitespace characters.');
            }

            if (!emailPattern.test(trimmedEmail)) {
                errors.push('Invalid email format.');
            }
            if (!phonePattern.test(trimmedPhone)) {
                errors.push('Invalid phone number format.');
            }

            if (!passwordPattern.test(password)) {
                errors.push('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
            }
            if (password !== confirmPassword) {
                errors.push('Passwords do not match.');
            }
        }


        if (errors.length > 0) {
            return res.status(400).send({errors: errors})
        }

        next();
    } catch (err) {
        next(err)
    }
}


const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = req.user;
        const user_id = req.user.id

        const token = jwt.sign({
            email: email,
            user_id: user_id,
            accessLevel: user.accessLevel
        }, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY});

        res.json({email: email, accessLevel: user.accessLevel, token: token})


    } catch (err) {
        console.log(err);
        next(err)
    }
}

const registerUser = async (req, res, next) => {
    try {
        const {lname, fname, email, password, phone} = req.body;

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        let user = new usersModel({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword,
            phone: phone,
            shopping_cart: []
        });
        await user.save();
        const {accessLevel, id} = user;
        const token = jwt.sign({email: email, user_id: id, accessLevel: accessLevel}, JWT_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRY
        })

        res.status(201).json({email, token, accessLevel})

    } catch (err) {
        next(err)
    }
}


// ======================================================================================================================
// ============================================ Logic Check =============================================================
// ======================================================================================================================

const checkDuplicateUser = async (req, res, next) => {
    try {
        const {email} = req.body;
        let user = await usersModel.findOne({email: email}, undefined, undefined)
        if (user) {
            return res.status(400).send({message: `User already exists`})
        }
        next()

    } catch (error) {
        next(error)
    }
}

const checkUserExists = async (req, res, next) => {
    try {
        const email = req.body.email;
        let user = await usersModel.findOne({email: email}, undefined, undefined)
        if (!user) {
            return res.status(401).send({message: `User not found`})
        }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

const checkPasswordIsMatch = async (req, res, next) => {
    try {
        const {password} = req.body;
        const user = req.user;
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({error: "Invalid Credentials"})
        }
        next()
    } catch (err) {
        next(err)
    }
}

const verifyLogin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({error: "No token provided"})
    }

    const token = authHeader.split(" ")[1];
    let user_data

    jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Forbidden"})
        }

        user_data = decoded;
        const {email, user_id, accessLevel} = user_data

        req.user_id = user_id
        req.accessLevel = accessLevel
        req.user_email = email
        next()

    })
}

const verifyAdmin = async (req, res, next) => {
    if (!req.accessLevel || req.accessLevel !== parseInt(process.env.ACCESS_LEVEL_ADMIN)) {
        return res.status(403).json({error: "Access denied"})
    }
    next();
}

// ==============================================================================================================
// ============================================ URL =============================================================
// ==============================================================================================================

router.post("/login", validateUserLoginInput, checkUserExists, checkPasswordIsMatch, login)
router.post(`/register`, validateUserRegistrationInput, checkDuplicateUser, registerUser);


module.exports = {router, verifyLogin, verifyAdmin};