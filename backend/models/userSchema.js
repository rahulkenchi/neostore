const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,
        default: 'NO'
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    address: Array
})

module.exports = mongoose.model("userSchema", userSchema)