const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');

//require APIs routes
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');


//Initialize express app
const app = express();

//Use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(`error: ${error}`))


app.use('/uploads', express.static('uploads'));


//Use passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);


/* Routes */
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);

//Run the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});
