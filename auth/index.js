var express =  require('express');
var mongoose = require('mongoose');
var router = express.Router();

// load schema on main file
require('./userSchema');

module.exports = function(passport){

  // Protect the routes
  // router.use(function(req,res,next){
  //   if(req.isAuthenticated()) next()
  //   else res.redirect('/');
  // });

  router.get('/success', function(req, res){
    console.log('something succeeded...');
    res.send({status : 'success', user : req.user ? req.user : null });
  });

  router.get('/failure', function(req, res){
    console.log('something happened...');
    res.send({state: 'failure', user: null, message: "Invalid username or password"});
  });

// TODO: remove this later...
/************* DEBUGGING PURPOSES ****************/
  var debugTest = function(req, res, next){
    console.log(req.params);
    console.log(req.headers);
    if(Object.keys(req.body).length) console.log('body', req.body);
    next();
  };
/****************************/


// Very bad way to get the password
  // var handleParameters = function(req,res,next){
  //   req.body = req.body || {};
  //   req.body.username = req.params.username;
  //   req.body.password = req.params.password;
  //   if (req.params.email) req.body.email = req.params.email;
  //   console.log(req.body);
  //   next();
  // };

  router.post('/login',/*/:username/:password', /*handleParameters, */ passport.authenticate('login', {
    successRedirect : '/auth/success',
		failureRedirect : '/auth/failure'
  }));

  // router.post('/login/:username/:password', debugTest, function(req,res){
  //   // console.log(req);
  //   res.end('');
  // });

  // router.post('/login/:username/:password', debugTest, function(req,res,next){
  //   console.log('here...');
  //   console.log(req.isAuthenticated());
  //   // console.log(req.url);
  //   // console.log(req.body);
  //   passport.authenticate('login', function(err,user,info){
  //     // console.log(err);
  //     console.log(req.isAuthenticated());
  //     console.log(user);
  //     console.log(info);
  //   })(req,res,next);
  //   next();
  // });


  router.post('/signup',/*/:username/:password/:email', handleParameters, */ passport.authenticate('signup', {
    successRedirect : '/auth/success',
		failureRedirect : '/auth/failure'
  }));

  router.get('/signout', function(req,res){
    console.log('signing out');
    req.logout(); // Logs out from passport. Desserializes user
    res.redirect('/');
  });

// TODO: remove this later....
/************* DEBUGGING PURPOSES ****************/
  router.get('/:anything(*)', function(req,res){
    console.log(req.params.anything);
    res.end('');
  });
/*********************/

  return router;
}


//module.exports = router;
