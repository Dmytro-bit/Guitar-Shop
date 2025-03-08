const {Categories} = require("../models/product");
const {verifyLogin, verifyAdmin} = require("./auth");
const multer = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const router = require("express").Router();


const uploadImages = (req, res, next) => {
    if (req.files) {
        if (req.files["cover_image"]) {
            req.cover_image_url = `http://localhost:${process.env.PORT}/uploads/${req.files["cover_image"][0].filename}`
        }
        if (req.files["background_image"]) {
            req.background_image_url = `http://localhost:${process.env.PORT}/uploads/${req.files["background_image"][0].filename}`
        }
    }
    next()
};


router.get("", async (req, res, next) => {
    try {
        const data = await Categories.find().lean();

        res.status(200).json({data: data})
    } catch (e) {
        next(e);
    }
})

router.post("", verifyLogin, verifyAdmin, upload.fields([{name: "cover_image"}, {name: "background_image"}]), uploadImages, async (req, res, next) => {
        try {
            const {name} = req.body;

            if (!name) {
                return res.status(400).json({error: "Category name is required"});
            }

            const coverImage = req.files["cover_image"] ? req.cover_image_url : null;
            const backgroundImage = req.files["background_image"] ? req.background_image_url : null;

            const newCategory = new Categories({
                name,
                cover_image: coverImage,
                background_image: backgroundImage
            });

            await newCategory.save();

            res.status(201).json({message: "Category created successfully", data: newCategory});
        } catch (e) {
            next(e);
        }
    }
);

router.patch("/:id", verifyLogin, verifyAdmin, upload.fields([{name: "cover_image"}, {name: "background_image"}]), uploadImages, async (req, res, next) => {
    try {
        let update = {}
        const {name} = req.body;

        if (name) update.name = name;
        if (req.cover_image_url) update.cover_image = req.cover_image_url;
        if (req.background_image_url) update.background_image = req.background_image_url;

        const category = await Categories.findOneAndUpdate({_id: req.params.id}, update, {new: true})

        res.status(200).json({data: category});
    } catch (e) {
        next(e);
    }

})

module.exports = router;