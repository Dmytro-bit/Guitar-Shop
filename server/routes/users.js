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



router.post(`/register`, checkDuplicateUser, registerUser );


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

router.post("/login",checkUserExists, checkPasswordIsMatch, login)

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