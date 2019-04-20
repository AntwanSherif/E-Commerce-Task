const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../../config/keys').secretOrKey;
const passport = require('passport');
const bcrypt = require('bcryptjs');

// @route   POST api/users/register
// @desc    Register user & return jwt token
// @access  Public
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            //check username availability
            if(user) {
                return res.status(400).json({ username: 'User already exists!' })
            }

            const newUser = new User({ username, password });

            //hash the user password
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if(error) throw error;
                    newUser.password = hash;

                    //add user to DB
                    newUser.save()
                        .then(({ username, isAdmin }) => {
                            /* Generate jwt token */
                            const payload = { username, isAdmin };

                            //generate token
                            const token = jwt.sign(
                                payload, 
                                secretOrKey, 
                                { expiresIn: "7d" }
                            );
                            
                            res.json({
                                success: true,
                                message: 'User Registered successfully!',
                                accessToken: `Bearer  ${token}`,
                            });
                        })
                        .catch(error => console.log(error))
                })
            })
    });
});

// @route   POST api/users/login
// @desc    Login user & return jwt token
// @access  Public
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            //check username
            if(!user) {
                return res.status(404).json({ username: 'User not found' })
            } 
            
            //check password
            //password is NOT encrypted
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) {
                        return res.status(400).json({ password: 'Password incorrect' })
                    }

                    //User credentials match
                    /* Generate jwt token in case of correct credentials */
                    const payload = { username, isAdmin: username === "admin" };
                        
                    //generate token
                    const token = jwt.sign(
                        payload, 
                        secretOrKey, 
                        { expiresIn: "7d" }
                    );
                    
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        accessToken: `Bearer  ${token}`,
                    });

                });
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        res.json(req.user);
    }
);

module.exports = router;