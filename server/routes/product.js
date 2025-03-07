const {Product, Categories} = require("../models/product");


const router = require("express").Router();

router.patch(`/products/:id`, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category")
        return res.status(200).send({data: data})

    } catch (error) {
        res.status(400).send({error: error})
    }
})


router.get(`/products`, async (req, res) => {
    try {
        let {name, brand, category, minPrice, maxPrice, minRating, maxRating} = req.query
        let filter_dict = {}

        // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
        if (name) filter_dict.name = {"$regex": name, "$options": "i"}
        if (brand) filter_dict.brand = brand
        if (category) {
            filter_dict.category = await Categories.findOne({name: category}, undefined, undefined)
        }

        if (minPrice || maxPrice) {
            filter_dict.price = {}
            if (minPrice) filter_dict.price.$gte = Number(minPrice)
            if (maxPrice) filter_dict.price.$lte = Number(maxPrice)
        }

        if (minRating || maxRating) {
            filter_dict.rating = {}
            if (minRating) filter_dict.rating.$gte = Number(minRating)
            if (maxRating) filter_dict.rating.$lte = Number(maxRating)
        }


        const data = await Product.find(filter_dict).populate("category").lean()

        res.status(200).json({data: data});
    } catch (error) {
        res.status(400).send({error: error});
    }
})

router.get(`/products/:id`, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category").lean();
        res.status(200).json({data: data});
    } catch (e) {
        res.status(400).send({error: e});
    }
})


router.post(`/products`, async (req, res) => {
    try {
        const {name, brand, model, category, images, rating, quantity, props} = req.body;

        const newProduct = new Product({name, brand, model, category, images, rating, quantity, props});
        const savedProduct = await newProduct.save();

        return res.status(200).send({data: savedProduct});
    } catch (e) {
        res.status(400).send({error: e});
    }
})

module.exports = router;