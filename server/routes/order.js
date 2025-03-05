const router = require("express").Router();
const validateOrder = require("./middleware");

const {orderModel, itemModel, shoppingCartModel} = require("../models/order");

router.post(`/order`, validateOrder, async (req, res) => {
    try {


        // if (!items || !items.length || !delivery_method || !total_price) {
        //     return res.status(400).json({error: "Missing required fields"});
        // }
        //
        // const newOrder = new orderModel({
        //     user_id: user_id,
        //     items: items,
        //     delivery_method: delivery_method,
        //     total_price: total_price,
        //     paid: false,
        //     customer_info: customer_info
        // });
        //
        // const savedOrder = await newOrder.save();
        // res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.get(`/order`, async (req, res) => {
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
        res.status(500).json({error: err})
    }
})


module.exports = router;