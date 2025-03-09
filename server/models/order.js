const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema(
    {
        user_id: {type: 'ObjectId', ref: 'users', required: false, default: null},

        items: [{
            product: {type: 'ObjectId', ref: 'products', required: true},
            quantity: {type: Number, required: true},
        }],

        total_price: {type: Number, required: true},

        paid: {type: Boolean, default: false},
        payment_id: {type: 'String', required: true},

        customer_info: {
            name: String,
            phone: String,
            address: {
                fline: {type: String, required: true},
                sline: {type: String, required: true},
                city: {type: String, required: true},
                county: {type: String, required: true},
                eircode: {type: String, required: true}
            },
            email: String,
        },

        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
    }
)

const orderModel = mongoose.model('orders', orderSchema);


module.exports = orderModel
