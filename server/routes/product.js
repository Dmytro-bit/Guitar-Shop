const {Product} = require("../models/product");


const router = require("express").Router();

router.get(`/products/:id`, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category");
        return res.status(200).send({data: data});

    } catch (error) {
        res.status(400).send({error: error});
    }
})


router.get(`/products`, async (req, res) => {
    try {
        const data = await Product.find().populate("category");

        res.status(200).send({data: data});
    } catch (error) {
        res.status(400).send({error: error});
    }
})

module.exports = router;