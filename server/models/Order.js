const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;