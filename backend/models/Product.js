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
    vendor: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    status:{
        type: String,
        default: "waiting"
    },
    rating:{
        type: [Number],
        default: []
    },
    review:{
		type: [String],
        default: []
    },
});

module.exports = Product = mongoose.model('Product', ProductSchema);
