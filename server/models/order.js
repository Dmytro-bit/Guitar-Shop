const mongoose = require('mongoose');
const {randomUUID} = require('crypto');
const {productSchema, Categories} = require("./product");

const delivery_methods = ["an_post", "collect_from_store"]


const itemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},

    quantity: {type: Number, required: true}, // Item quantity in order
    price: {type: Number, required: true} // Price of all Items (Num of products * quantity)
});

let orderSchema = new mongoose.Schema(
    {
        id: {type: 'UUID', unique: true, default: () => randomUUID(), immutable: true, primaryKey: true},
        user_id: {type: 'ObjectId', ref: 'users', required: false, default: null},

        items: [itemSchema],
        delivery_method: {type: String, required: true, enum: delivery_methods},

        total_price: {type: Number, required: true},

        paid: {type: Boolean, default: false},
        payment_id: {type: 'String', required: true},

        customer_info: {
            name: String,
            phone: String,
            address: String,
            email: String,
        },

        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
    }
)

let shoppingCartSchema = new mongoose.Schema(
    {
        user_id: {type: 'ObjectId', ref: 'users', required: true},
        products: [
            {
                product_id: {type: 'ObjectId', ref: 'productSchema', required: true},
                quantity: {type: Number, required: true, default: 1} // Item quantity in Cart
            }
        ]
    }
)


const itemModel = mongoose.model('items', itemSchema);
const orderModel = mongoose.model('orders', orderSchema);
const shoppingCartModel = mongoose.model('shoppingCart', shoppingCartSchema);


module.exports = {
    orderModel,
    itemModel,
    shoppingCartModel
};