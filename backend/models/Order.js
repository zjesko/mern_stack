const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = Order = mongoose.model('Order', OrderSchema);