var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

module.exports = function(passport){
  var User = mongoose.model('User');

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('it was here... serializing');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('it was here... deserializing');
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done){
    console.log('here, trying to log in...');
    User.findOne({username : username}, function(err, user){
      console.log('probably here...');
      if (err) return done(err);
      if (!user) {
        console.log('... or probably here...');
        console.log('Username not found by name: ' + username);
        return done(null, false);
      }
      // if (!isValidPass(user, password)) {
      if (!user.validPassword(password)) {
        console.log('Password incorrect');
        return done(null, false);
      }
      return done(null, user);
    });
  }));

  passport.use('signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done){
    // console.log('here, trying to sign up...');
    User.findOne({username : username}, function(err, user){
      if (err) return done(err);
      if (user) {
        console.log('User already exists');
        return done(null, false);
      }
      // console.log(req.body);
      // console.log(done);
      // var newuser = new User({
      //   usename : username,
      //   password : createHash(password),
      //   email : email
      // });

      var newuser = new User();

      newuser.username = username;
      newuser.password = newuser.generateHash(password);
      newuser.email = req.body.email;

      newuser.save(function(err,user){
        if (err) {
          console.log('error in saving user ' + err);
          throw err;//return done(err);
        }
        console.log(user.username + ' registration successful!');
        return done(null, user);
      });
    });
  }));

  // var isValidPass = function(user, pass){
  //   return bCrypt.compareSync(pass, user.password);
  // }
  //
  // var createHash = function(pass){
  //   return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
  // }
};
