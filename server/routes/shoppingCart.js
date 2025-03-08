const router = require("express").Router();
const usersModel = require("../models/users");
const {verifyLogin} = require("./auth");


router.get(``, verifyLogin, async (req, res) => {
    try {
        const user = await usersModel.findOne({_id: req.user_id}, undefined, undefined).populate({
            path: "shopping_cart.product",
            populate: {path: "category"}
        }).lean()

        let totalPrice = 0;
        let shopping_cart = user.shopping_cart

        shopping_cart.forEach(item => {
            const product = item.product;
            const productPrice = product.price || 0
            const quantity = item.quantity || 0

            totalPrice += productPrice * quantity
        });

        res.status(200).json({shopping_cart: shopping_cart, total: totalPrice});
    } catch (err) {
        res.status(500).json({error: err})
    }
})


router.patch(``, verifyLogin, async (req, res, next) => {
    try {
        const data = req.body;
        console.log("received data is ", data);
        const user = await usersModel.findOneAndUpdate(
            {_id: req.user_id},
            {
                $set: {shopping_cart: data}
            },
            {new: true}
        ).populate("shopping_cart.product");

        let totalPrice = 0;
        let shopping_cart = user.shopping_cart

        shopping_cart.forEach(item => {
            const product = item.product;
            const productPrice = product.price || 0
            const quantity = item.quantity || 0

            totalPrice += productPrice * quantity
        });

        res.status(200).json({shopping_cart: shopping_cart, total: totalPrice});

    } catch (err) {
        next(err);
    }
});

module.exports = router;