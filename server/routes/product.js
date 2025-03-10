const {Product} = require("../models/product");
const {verifyLogin, verifyAdmin} = require("./auth");
const multer = require("multer");
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const router = require("express").Router();

router.patch(`/products/:id`, verifyLogin, verifyAdmin, upload.array("images_files"), async (req, res, next) => {
    try {
        let {name, brand, category, price, quantity, parameters} = req.body;

        let update = {}

        if (name) update.name = name;
        if (brand) update.brand = brand;
        if (price) update.price = Number(price);
        if (quantity) update.quantity = Number(quantity);
        if (category) update.category = category;

        if (parameters) {
            try {
                update.parameters = JSON.parse(parameters);
            } catch (err) {
                return res.status(400).json({error: "Invalid parameters format"});
            }
        }

        if (req.files && req.files.length > 0) {
            let new_images = req.files.map(file => `http://localhost:${process.env.PORT}/uploads/${file.filename}`);
            let images = [];
            if (req.body.images) {
                try {
                    images = JSON.parse(req.body.images)
                } catch (error) {
                    return res.status(400).json({error: "Invalid images format"});
                }
            }
            let old_images = images.filter(image => !image.startsWith("blob"));

            update.images = [...old_images, ...new_images];
        }


        const updateProduct = await Product.findOneAndUpdate({_id: req.params.id}, update, {new: true}).populate("category")
        return res.status(200).send({data: updateProduct})

    } catch (error) {
        next(error)
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

        let category_filter = req.query.category;
        let filter_dict = {}

        if (!Array.isArray(category_filter)) {
            category_filter = category_filter ? [category_filter] : [];
        }

        if (category_filter.length > 0) {
            filter_dict = {category: {$in: category_filter}}
        }

        const brands = await Product.distinct("brand", filter_dict);
        const categories = await Product.distinct("category");


        const parametersData = await Product.aggregate([
            {
                $match: filter_dict,
            },
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


router.post(`/products`, verifyLogin, verifyAdmin, upload.array("images_files"), async (req, res, next) => {
    try {
        let {name, brand, category, price, quantity, parameters} = req.body;

        let data = {}

        if (name) data.name = name;
        if (brand) data.brand = brand;
        if (price) data.price = Number(price);
        if (quantity) data.quantity = Number(quantity);
        if (category) data.category = category;

        if (parameters) {
            try {
                data.parameters = JSON.parse(parameters);
            } catch (err) {
                return res.status(400).json({error: "Invalid parameters format"});
            }
        }

        data.images = req.files.map(file => `http://localhost:${process.env.PORT}/uploads/${file.filename}`);

        const newProduct = new Product(data);

        const savedProduct = await newProduct.save();

        return res.status(200).send({data: savedProduct});
    } catch (e) {
        next(e)
    }
})


router.delete(`/products/:id`, verifyLogin, verifyAdmin, async (req, res, next) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id, undefined);
        return res.status(200).send({data: result});
    } catch (e) {
        next(e);
    }
})
module.exports = router;