const router = require("express").Router();

const {verifyAdmin} = require("./auth");
const usersModel = require("../models/users");
const multer = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const jwt = require("jsonwebtoken");
const fs = require("fs");
const e = require("express");
const {response} = require("express");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");
// upload image to profile
const uploadImage = (req, res, next) => {
    req.imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
    next()
}

const addImageToProfile = async (req, res, next) => {
    try {
        const {email} = req.body
        const {imageUrl} = req
        const user = await usersModel.findOneAndUpdate({email: email}, {profilePhotoUrl: imageUrl}, {returnDocument: 'after'})
        if (!user) {
            return res.status(404).send({message: "User not found"})
        } else {
            res.status(200).json({userPhoto: imageUrl})
        }
    } catch (err) {
        next(err)
    }

}


// edit address
const editAddress = async (req, res, next) => {
    try {
        const {email} = req.body
        const {fline, sline, city, county, eircode} = req.body;
        console.log(fline, sline, city, county, eircode)
        let user = await usersModel.findOneAndUpdate({email: email}, {
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

// get profile data
const checkUserExists = async (req, res, next) => {
    try {
        const email = req.query.email;
        let user = await usersModel.findOne({email: email}, '-password -accessLevel -_id -__v', undefined)
        if (!user) {
            return res.status(404).send({message: `User not found`})
        }
        req.user = user
        next()


    } catch (err) {
        next(err)
    }
}


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

    if (expiryDate.getTime() < Date.now()) {
        return res.status(401).json({error: "Token expired"});
    }
    next();
}

const returnUserData = async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user.email);
        res.status(200).json({user})
    } catch (err) {
        next(err)
    }
}
const updateProfile = async (req, res, next) => {
    try {
        const {email, user} = req.body;

        const newUser = await usersModel.findOneAndUpdate({email: email}, user, {returnDocument: `after`})

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

router.get('/getProfile', checkUserExists, verifyLogin, returnUserData);
router.patch('/upload', upload.single('file'), verifyLogin, uploadImage, addImageToProfile);
router.patch('/editAddress', verifyLogin, editAddress);
router.patch('/updateProfile', verifyLogin, updateProfile);
router.get('/getUserAddress', checkUserExists, verifyLogin, getUserAddress);

router.get('', verifyLogin, async (req, res, next) => {
    try {
        const data = await usersModel.find(undefined, undefined, undefined)

        res.status(200).json({data: data})
    } catch (e) {
        next(e)
    }
})

module.exports = router;