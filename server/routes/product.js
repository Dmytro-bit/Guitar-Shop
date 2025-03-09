const {Product} = require("../models/product");
const {verifyLogin, verifyAdmin} = require("./auth");


const router = require("express").Router();

router.patch(`/products/:id`, verifyLogin, verifyAdmin, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category")
        return res.status(200).send({data: data})

    } catch (error) {
        res.status(400).send({error: error})
    }
})


router.get(`/products`, async (req, res) => {
    try {
        let {name, brand, category, minPrice, maxPrice, minRating, maxRating, ...parameters} = req.query
        let filter_dict = {}

        // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
        if (name) filter_dict.name = {"$regex": name, "$options": "i"}
        if (brand) filter_dict.brand = brand
        if (category) filter_dict.category = category


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

        for (const key in parameters) {
            if (Array.isArray(parameters[key])) {
                filter_dict[`parameters.${key}`] = {$in: parameters[key]}
            } else {
                filter_dict[`parameters.${key}`] = parameters[key]
            }
        }

        const data = await Product.find(filter_dict).populate("category").lean()

        res.status(200).json({data: data});
    } catch (error) {
        res.status(400).json({error: error});
    }
})
router.get("/products/filter", async (req, res, next) => {
    try {

        const brands = await Product.distinct("brand");
        const categories = await Product.distinct("category");


        const parametersData = await Product.aggregate([
            {$project: {parameters: {$objectToArray: "$parameters"}}},
            {$unwind: "$parameters"},
            {
                $group: {
                    _id: "$parameters.k",
                    values: {$addToSet: "$parameters.v"}
                }
            }
        ])
        const parameters = {}

        parametersData.forEach(param => {
            parameters[param._id] = param.values;
        });


        res.status(200).json({
            data: {
                brands: brands,
                categories: categories,
                parameters: parameters
            }
        });
    } catch (err) {
        next(err)
    }
})


router.get(`/products/:id`, async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id}).populate("category").lean();
        res.status(200).json({data: data});
    } catch (e) {
        res.status(400).json({error: e});
    }
})


router.post(`/products`, verifyLogin, verifyAdmin, async (req, res) => {
    try {

        const {name, brand, model, category, images, rating, quantity, props} = req.body;

        const newProduct = new Product({name, brand, model, category, images, rating, quantity, props});
        const savedProduct = await newProduct.save();

        return res.status(200).send({data: savedProduct});
    } catch (e) {
        res.status(400).json({error: e});
    }
})


router.delete(`/products/:id`, verifyLogin, verifyAdmin, async (req, res, next) => {
    try {

        const result = Product.findByIdAndDelete(req.params.id, undefined);
        return res.status(200).send({data: result});
    } catch (e) {
        next(e);
    }
})
module.exports = router;