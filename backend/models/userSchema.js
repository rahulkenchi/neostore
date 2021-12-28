const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("userSchema", userSchema)