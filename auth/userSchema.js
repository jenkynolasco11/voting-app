var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  created_by : { type : Date, default : Date.now() }
});

// Model instance methods
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
//
// // Model static methods
// UserSchema.statics.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

mongoose.model('User', UserSchema);
