const router = require("express").Router();

const usersModel = require("../models/users");
const multer = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const emptyFolder = require('empty-folder')

// upload image to profile
const uploadImage = (req, res, next) => {
    const fileUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
    req.imageUrl = fileUrl
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

// get profile data
const checkUserExists = async (req, res, next) => {
    try {
        const email = req.query.email;
        let user = await usersModel.findOne({email: email}, '-password -accessLevel -_id -__v', undefined)
        if (!user) {
            return res.status(404).send({message: `User not found`})
        }
        req.user = user
        res.status(200).json({user})

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
    } catch (e){
        next(e)
    }

}

router.get('/getProfile', checkUserExists)
router.patch('/upload', upload.single('file'), uploadImage, addImageToProfile);
router.patch('/editAddress', editAddress);

module.exports = router;