const mongoose = require('mongoose')
const color = new mongoose.Schema({
    color_name: {
        type: String,
        required: true
    },
    color_code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("color", color)