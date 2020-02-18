const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bundle_quantity: {
        type: Number,
        required: true
    },
    bundle_price: {
        type: Number,
        required: true
    },
    dispatch: {
        type: Boolean,
        default: false
    }
});

module.exports = Product = mongoose.model('Pendor', ProductSchema);