const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define schema
const ProductSchema = new Schema({
    name: { type: String, required: true },
    inStockQuantity: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0, required: true },
    image: { data: String },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});


module.exports = Product = mongoose.model('products', ProductSchema );