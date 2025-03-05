const {Product} = require("../models/product");


const router = require("express").Router();

router.patch(`/products/:id`, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category");
        return res.status(200).send({data: data});

    } catch (error) {
        res.status(400).send({error: error});
    }
})


router.get(`/products`, async (req, res) => {
    try {
        const data = await Product.find().populate("category").lean();

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
        const {name, category, images, rating, quantity, props} = req.body;

        const newProduct = new Product({name, description, category, images, rating, quantity, props});
        const savedProduct = await newProduct.save();

        return res.status(200).send({data: savedProduct});
    } catch (e) {
        res.status(400).send({error: e});
    }
})
module.exports = router;