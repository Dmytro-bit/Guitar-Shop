const router = require("express").Router();
const usersModel = require("../models/users");
const {verifyLogin} = require("./auth");
const productModel = require("../models/product");

router.get(``, verifyLogin, async (req, res, next) => {
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

        totalPrice = totalPrice.toFixed(2);
        res.status(200).json({shopping_cart: shopping_cart, total: totalPrice});
    } catch (err) {
        next(err);
    }
})

const guestCart = async (req, res, next) => {
    try {
        const data = req.body;
        if (data === {}) {
            let totalPrice = 0
            res.json({shopping_cart: [], totalPrice});
        }
        const ids = data.map(item => item.product);
        console.log("data ", data);

        const products = await productModel.Product.find({_id: {$in: ids}}).populate(`category`).lean()
        console.log(products);
        let totalPrice = 0;

        const populatedCart = products.map(product => {
            const cartItem = data.find(item => item.product === product._id.toString());
            const quantity = cartItem ? cartItem.quantity : 0;
            totalPrice += (product.price || 0) * quantity;
            return {product, quantity};
        });
        console.log("cart", populatedCart);
        totalPrice = totalPrice.toFixed(2);
        res.json({shopping_cart: populatedCart, totalPrice});
    } catch (err) {
        next(err);
    }
}

router.post(`/guestCart`, guestCart)

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
        totalPrice = totalPrice.toFixed(2);
        res.status(200).json({shopping_cart: shopping_cart, total: totalPrice});

    } catch (err) {
        next(err);
    }
});

module.exports = router;