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
        type: Number,
        default: 0
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('User', UserSchema);