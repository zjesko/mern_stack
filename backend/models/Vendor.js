const mongoose = require('mongoose');
const Schema = mongoose.Schema

const VendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});

module.exports = Vendor = mongoose.model('Vendor', VendorSchema);