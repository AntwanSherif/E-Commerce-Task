const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false }
});


module.exports = User = mongoose.model('users', UserSchema );