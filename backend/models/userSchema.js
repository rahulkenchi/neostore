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
        required: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: Number,
        default: null
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    sociallogin: {
        _provider: {
            type: String,
        }
    },
    isSocialLogin: {
        type: Boolean,
        required: true
    },
    profilePicURL: {
        type: String,
        default: ""
    },
    address: Array,
    cart: Array
})

module.exports = mongoose.model("userSchema", userSchema)