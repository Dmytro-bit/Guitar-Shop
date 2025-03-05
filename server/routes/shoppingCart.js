const router = require("express").Router();
const {orderModel, itemModel, shoppingCartModel} = require("../models/order");


router.get(`/shopping-cart`, async (req, res) => {
    try {
        let data = await shoppingCartModel.findOne({user_id: req.user.id});
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

router.patch(`/shopping-cart`, async (req, res) => {
    try {
        const {user_id, product_id, quantity} = req.body;

        if (!user_id || !product_id) {
            return res.status(400).json({error: "Missing user_id or product_id"});
        }

        let cart = await shoppingCartModel.findOne({user_id});

        if (!cart) {
            cart = new shoppingCartModel({user_id, products: []});
        }

        const productIndex = cart.products.findIndex(item => item.product_id.equals(product_id));

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
        } else {
            if (quantity > 0) {
                cart.products.push({product_id, quantity});
            }
        }

        await cart.save();
        res.json({message: "Cart updated successfully", cart});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;