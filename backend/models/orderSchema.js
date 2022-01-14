const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    orderlist: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model("order", orderSchema)