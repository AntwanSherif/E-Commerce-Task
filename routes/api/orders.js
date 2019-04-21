const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');


// @route   GET api/orders/
// @desc    Get all orders (by Admin)
// @access  Private
router.get(
    '/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Order.find()
        .sort({ date: -1 })
        .populate('user', 'username')
        .populate('orderDetails.product', ['name', 'image'])
        .then(orders => res.json(orders))
        .catch(error => res.status(404).json({ msg: 'No orders placed yet.'}))
    }
);

// @route   POST api/orders
// @desc    Create order (by user)
// @access  Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const newOrder = new Order({
            user: req.user.id,
            orderDetails: req.body.orderDetails,
            totalPrice: req.body.totalPrice
        });

        newOrder.save()
        .then(order => res.json(order));
    }
);


module.exports = router;