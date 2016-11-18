var express =  require('express');
var mongoose = require('mongoose');
var router = express.Router();

// load schema on main file
require('./userSchema');

module.exports = function(passport){

  // TODO: unccmment this later
  // Protect the routes
  // router.use(function(req,res,next){
  //   if(req.isAuthenticated()) next()
  //   else res.redirect('/');
  // });

  router.get('/success', function(req, res){
    console.log('something succeeded...');
    var user = req.user || null;
    // console.log(user);
    res.end(JSON.stringify({
      status : 'success',
      user : user.username || null,
    }));
  });

  router.get('/failure', function(req, res){
    console.log('something happened...');
    res.end(JSON.stringify({
      // state: 'failure',
      status : 'failure',
      user: null,
      message: "Invalid username or password"
    }));
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect : '/auth/success',
		failureRedirect : '/auth/failure'
  }));

  router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/auth/success',
		failureRedirect : '/auth/failure'
  }));

  router.get('/signout', function(req,res){
    console.log('signing out');
    req.logout(); // Logs out from passport. Desserializes user
    res.redirect('/');
  });

  router.get('/isauth', function(req,res){
    if(req.isAuthenticated()) {
      return res.end(JSON.stringify({
        user : req.user.username
      }));
    }
    res.end(JSON.stringify({
      'user' : null
    }));
  });

  return router;
}
