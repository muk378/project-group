// models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = new mongoose.Schema({
  userName: String,
  password: String
});

userSchema.methods.validPassword = function(pass) {
  return pass === this.password;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
