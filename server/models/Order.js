const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = require('./Product').ProductSchema;

//Define schema
const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    orderDetails: { 
        type: [{
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true }
        }], 
        required: true 
    },
    date: { type: Date, default: Date.now() },
    totalPrice: { type: Number, required: true }
});

module.exports = Order = mongoose.model('orders', OrderSchema );