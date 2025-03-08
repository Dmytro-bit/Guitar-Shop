const router = require("express").Router();

const orderModel = require("../models/order");

router.post(``, async (req, res, next) => {
    try {
        let {user_id, items, total_price, customer_info, paymentID} = req.body;

        let data = {}

        if (user_id) data.user_id = user_id;


        data.items = items
        data.total_price = total_price
        data.paid = true
        data.customer_info = customer_info
        data.payment_id = paymentID

        const newOrder = new orderModel(data);

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch
        (error) {
        next(error)
    }
})

router.get(`/order`, async (req, res, next) => {
    try {
        let data

        if (req.user != null) {
            data = await orderModel.findOne({_id: req.params.id, user_id: req.user.id});
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


module.exports = router;