const router = require("express").Router();

const usersModel = require("../models/users");
const multer = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const jwt = require("jsonwebtoken");
const fs = require("fs");
const e = require("express");
const {response} = require("express");
const {join} = require("node:path");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");

const uploadImage = (req, res, next) => {
    req.imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
    next()
}

const addImageToProfile = async (req, res, next) => {
    try {
        const id = req.user_id

        const {imageUrl} = req
        const user = await usersModel.findOneAndUpdate({_id: id}, {profilePhotoUrl: imageUrl}, {new: true})
        if (!user) {
            return res.status(404).send({message: "User not found"})
        } else {
            res.status(200).json({userPhoto: imageUrl})
        }
    } catch (err) {
        next(err)
    }

}


const validateAddress = (req, res, next) => {
    const {fline, sline, city, county, eircode} = req.body;

    if (!fline?.trim() || !sline?.trim() || !city?.trim() || !county?.trim() || !eircode?.trim()) {
        return res.status(400).json({error: 'All address fields are required.'});
    }

    const eircodeRegex = /^[A-Za-z]\d{2}\s?[A-Za-z\d]{4}$/;
    if (!eircodeRegex.test(eircode)) {
        return res.status(400).json({error: 'Invalid eircode format.'});
    }

    next();
};

const editAddress = async (req, res, next) => {
    try {
        const id = req.user_id

        const {fline, sline, city, county, eircode} = req.body;
        console.log(fline, sline, city, county, eircode)
        let user = await usersModel.findOneAndUpdate({_id: id}, {
            address: {
                fline: fline,
                sline: sline,
                city: city,
                county: county,
                eircode: eircode
            }
        }, {returnDocument: 'after'})
        if (!user) {
            return res.status(404).send({message: `User not found`})
        }
        res.status(200).json({user})
    } catch (e) {
        next(e)
    }

}

const checkUserExists = async (req, res, next) => {
    try {
        const id = req.user_id
        let user = await usersModel.findOne({_id: id}, '-password -accessLevel -_id -__v', undefined)
        if (!user) {
            return res.status(404).send({message: `User not found`})
        }
        req.user = user
        next()


    } catch (err) {
        next(err)
    }
}

const validateImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({error: "No file uploaded."});
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({error: "Invalid file type. Only JPEG, PNG, and GIF are allowed."});
    }

    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
        return res.status(400).json({error: "File too large. Maximum size is 5MB."});
    }

    next();
};

const verifyLogin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: "No token provided"});
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({error: "Invalid or expired token"});
    }

    const expiryTimeStamp = decoded.exp;
    const expiryDate = new Date(expiryTimeStamp * 1000);
    console.log("expiry date", expiryDate.getTime());
    console.log("now", Date.now());
    const user_data = decoded;
    const {email, user_id, accessLevel} = user_data
    req.user_id = user_id
    req.accessLevel = accessLevel
    req.user_email = email
    if (expiryDate.getTime() < Date.now()) {
        return res.status(401).json({error: "Token expired"});
    }
    next();
}

const returnUserData = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({user})
    } catch (err) {
        next(err)
    }
}
const updateProfile = async (req, res, next) => {
    try {
        const {user} = req.body;
        const id = req.user_id

        const required_fields = ["fname", "lname", "email", "phone", "address", "profilePhotoUrl"];
        const update = {};

        Object.keys(user).forEach(key => {
            if (required_fields.includes(key)) {
                update[key] = user[key];
            }
        });

        const newUser = await usersModel.findOneAndUpdate({_id: id}, {$set: update}, {new: true})

        res.status(200).json({newUser})
    } catch (e) {
        next(e)
    }
}


const getUserAddress = async (req, res, next) => {
    try {
        const address = req.user.address
        res.status(200).json({address})
    } catch (err) {
        next(err)
    }
}
router.get('/getProfile', verifyLogin, checkUserExists, returnUserData);
router.patch('/upload', upload.single('file'), verifyLogin, validateImage, uploadImage, addImageToProfile);
router.patch('/editAddress', verifyLogin, validateAddress, editAddress);
router.patch('/updateProfile', verifyLogin, updateProfile);
router.get('/getUserAddress', verifyLogin, checkUserExists, getUserAddress);

module.exports = router;