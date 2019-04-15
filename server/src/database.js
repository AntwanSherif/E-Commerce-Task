//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Defining schemas
var Schema = mongoose.Schema;

var UserRoleSchema = new Schema({
  role: String
});

var ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true },
    image: Buffer
});

// Compile models from schemas
var UserRoleModel = mongoose.model('UserRole', UserRolesSchema );
var ProductModel = mongoose.model('Products', ProductSchema );