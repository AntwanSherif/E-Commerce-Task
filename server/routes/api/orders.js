const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');


// @route   GET api/orders/
// @desc    Get all orders
// @access  Public
router.get(
    '/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Order.find()
        .sort({ date: -1 })
        // .populate('user', [username])
        .then(orders => res.json(orders))
        .catch(error => res.status(404).json({ msg: 'No orders placed yet.'}))
    }
);

// @route   GET api/orders/user/:userID
// @desc    Gets current user's orders
// @access  Private
router.get(
    '/user/:userID', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        User.findById(req.params.userID)
        .then(user => {
            Order.find({ user: req.params.userID })
            .then(orders => {
                return res.json(orders)
            })
            .catch(error => res.status(404).json({ msg: 'No orders placed by this user' }))
        })
        .catch(error => res.status(404).json({ msg: 'Invalid user id'}))
    }
);

// @route   POST api/orders
// @desc    Create order
// @access  Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const newOrder = new Order({
            user: req.user.id,
            ...req.body.orderDetails
        });

        newOrder.save()
        .then(order => res.json(order));
    }
);


module.exports = router;