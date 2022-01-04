const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "color"
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
})

module.exports = mongoose.model("productSchema", productSchema)