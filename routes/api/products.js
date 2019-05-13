const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

const User = require('../../models/User');
const Product = require('../../models/Product');

/** Configure multer for image uploads */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



// @route   GET api/products/
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    Product.find()
    .then(products => res.json(products))
    .catch(error => res.status(404).json({ msg: 'No products added.'}))
});


// @route   POST api/products
// @desc    Create new product (by admin ONLY)
// @access  Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    upload.single('productImage'),
    (req, res) => {
        console.log(req.body)
        const newProduct = new Product({
            user: req.user.id,
            name: req.body.name,
            inStockQuantity: req.body.quantity,
            price: req.body.price,
            image: {
                data: req.file.path,
                // data: fs.readFileSync(req.files.userPhoto.path),
                // data: fs.readFileSync(req.file),
                // data: fs.readFileSync(req.file.productImage.path),
                // data: req.file,
            }
        });

        newProduct.save()
        .then(product => res.json(product))
        .catch(error => res.status(404).json(error))
    }
);

// @route   PUT api/products
// @desc    Update product
// @access  Private
router.put(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Product.findByIdAndUpdate(
            req.body.product._id,
            req.body.product,
            { new: true },
            (err, product) => {
                if (err) return res.status(404).json({ msg: 'product not found.'})
                return res.json(product)
            }
        )
    }  
);     

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private
router.delete(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        //Check if admin
        User.findById(req.body.id)
        Product.findByIdAndDelete({ id: req.params.id })
        
        Product.findById(req.params.id)
        .then(product => {
            //check product deletion authorization
            if(product.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized.'})
            }

            //Delete product
            product.remove()
            .then(() => {
                //remove from file system
                fs.unlink(product.image.data, err => {
                    if (err) throw err;
                    console.log('image deleted successfully.')
                })

                res.json({ msg: 'product deleted successfully.'})
            })
            .catch(error => res.status(404).json({ msg: 'product not found.'}))
        })
    }
);

module.exports = router;