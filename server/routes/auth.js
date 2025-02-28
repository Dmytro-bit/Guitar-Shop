const router = require("express").Router();

const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");

const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, phone} = req.body;

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        let user = new usersModel({name: name, email: email, password: hashedPassword, phone:phone});
        await user.save();
        const {accessLevel} = user;
        const token = jwt.sign({email: email, accessLevel: accessLevel}, JWT_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRY
        })

        res.json({name, token, accessLevel})

    } catch (err) {
        next(err)
    }
}

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

function validateUserRegistrationInput (req, res, next) {
    try {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*¬`@=)(-_:;'{}/\\ \[\].,<>?~|]).{8,}$/
        const phonePattern = /^\+3538\d\d{3,4}\d{4}$/;
        const namePattern =/^[a-zA-Z ]{2,30}$/;

        const {name, email, phone, password, confirmPassword} = req.body;
        const errors = [];

        if (!name || typeof name !== 'string' || name.trim() === '') {
            errors.push('Username is required and must be a non-empty string.');
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
            const trimmedName = name.trim();
            // --- Length & Whitelist Constraints ---

            if (trimmedName.length < 2 || trimmedName.length > 30) {
                errors.push('Username must be between 2 and 30 characters.');
            }

            if (!namePattern.test(trimmedName)) {
                errors.push('Username can only contain letters and whitespace characters.');
            }


            if (!emailPattern.test(trimmedEmail)) {
                errors.push('Invalid email format.');
            }
            if (!phonePattern.test(trimmedPhone)) {
            errors.push('Invalid phone number format.');}

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
    } catch(err) {
        next(err)
    }
}



router.post(`/register`, validateUserRegistrationInput, checkDuplicateUser, registerUser );


const login = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = req.user;

        const token = jwt.sign({
            email: email,
            accessLevel: user.accessLevel
        }, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY});

        res.json({name: user.name, accessLevel: user.accessLevel, token: token})


    } catch (err) {
        console.log(err);
        next(err)
    }
}

function validateUserLoginInput (req, res, next) {
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
            // Sanitize input by trimming whitespace
            const trimmedEmail = email.trim();

            // --- Length & Whitelist Constraints ---

            if (!emailPattern.test(trimmedEmail)) {
                errors.push('Invalid email format.');
            }
        }

        if (errors.length > 0) {
            return res.status(400).send({errors: errors})
        }

        next();
    } catch(err) {
        next(err)
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

router.post("/login", validateUserLoginInput,checkUserExists, checkPasswordIsMatch, login)

const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({error: "No token provided"})
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Forbidden"})
        }
        res.status(200).json({message: "Token verified"});
    })
}

module.exports = router;