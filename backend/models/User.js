const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: [Number],
        default: []
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    vendor: {
        type: Boolean,
        required: true
    },
    reviews: {
        type: String,
    }
});

module.exports = User = mongoose.model('User', UserSchema);