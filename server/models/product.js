const {MEDIA_DIR} = require('../server.js');

const mongoose = require('mongoose');


let categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    }
)


let productSchema = new mongoose.Schema(
    {
        name: String,
        category: {type: 'ObjectId', ref: 'categories', required: true},
        images: [{type: String, default: "", get: v => `${MEDIA_DIR}${v}`}],
        rating: {type: Number, default: 0, min: 0, max: 5},
        quantity: {type: Number, default: 0, required: true},
        parameters: { type: Map, of: String },
    }
)

const Product = mongoose.model(`products`, productSchema)
const Categories = mongoose.model(`categories`, categorySchema);

module.exports = {
    Product,
    Categories,
}