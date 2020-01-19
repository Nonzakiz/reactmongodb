const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
    title: String,
    detail: String,
    price: Number

})

module.exports = productSchema