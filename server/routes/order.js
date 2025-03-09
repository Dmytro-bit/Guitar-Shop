const router = require("express").Router();
const fs = require("fs");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");
const orderModel = require("../models/order");
const jwt = require("jsonwebtoken");
const {verifyLogin, verifyAdmin} = require("./auth")


const checkUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        let user_data

        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (!err) {

                user_data = decoded;
                const {email, user_id, accessLevel} = user_data

                req.user_id = user_id
                req.accessLevel = accessLevel
                req.user_email = email

            }
        })
    }
    next()
}


router.post(``, checkUser, async (req, res, next) => {
    try {
        let {total_price, items, customer_info, payment_id} = req.body;

        let data = {}

        if (req.user_id) data.user_id = req.user_id;


        data.items = items
        data.total_price = total_price
        data.paid = true
        data.customer_info = customer_info
        data.payment_id = payment_id

        const newOrder = new orderModel(data);

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch
        (error) {
        next(error)
    }
})

router.get(`/orders/:id`, async (req, res, next) => {
    try {
        let data

        if (req.user != null) {
            data = await orderModel.findOne({_id: req.params.id});
        } else {
            data = await orderModel.findOne({_id: req.params.id, user_id: null});
        }

        if (!data) {
            return res.status(404).json({error: 'Order not found'})
        }

        res.status(200).json(data)

    } catch (err) {
        next(err)
    }
})


router.get(``, verifyLogin, async (req, res, next) => {
    try {
        let data
        if (req.accessLevel === process.env.ACCESS_LEVEL_ADMIN) {
            data = await orderModel.find().populate("user_id").populate("items.product").sort({createdAt: -1})
        } else {
            data = await orderModel.find({user_id: req.user_id}).populate("user_id").populate("items.product").sort({createdAt: -1})
        }
        res.status(200).json({data: data})
    } catch (e) {
        next(e)
    }
})

router.get('/user/:id', verifyLogin, verifyAdmin,async (req, res, next) => {
    try {
        let data = await orderModel.find({user_id: req.params.id} , undefined, undefined).populate("user_id").populate("items.product").sort({createdAt: -1})

        res.status(200).json({data: data})
    }catch (e) {
        next(e);
    }
})
module.exports = router;