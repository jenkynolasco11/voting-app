// Load the env variables
'use strict';
require('dotenv').config();

var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var MongoConnect = require('connect-mongo')(session);
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passport = require('passport');
var morgan = require('morgan');
var app = express();

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV == 'development') mongoose.set('debug', true);

var db = mongoose.connect(process.env.MONGO_URL, function(err){
  if(err) console.error('Something happened while connecting to the database.');
  console.log('Connected to the database...');
});

autoIncrement.initialize(db);


// NOTE: Consider using Redis for session memory storage
// configure sessions
app.use(session({
  secret : process.env.SESSION_SECRET,
  store: new MongoConnect({ mongooseConnection : db.connection }),
}));

// Set middlewares
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(morgan('short'));
// app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

// configure static files
var paths = ['polls','auth'];
app.use('/static', express.static('./static'));
paths.forEach(function(path){
  app.use('/' + path, express.static('./' + path));
});

// configure routes
var auth = require('./auth/index')(passport);
var poll = require('./polls/index');
var errors = require('./errors');

var initPassport = require('./passport-init');
initPassport(passport);

// Configure view settings
app.set('views', paths.concat('views').map(path => './' + path));
app.set('view engine', 'pug');

// set routes
app.use('/auth', auth);
app.use('/polls', poll);
// Render the main view
app.get('/', function(req, res){
  res.render('index');
});


// Views renderer
app.get('/views/:viewpath(*)', function (req, res){
  var viewpath = req.params.viewpath;

  // console.log(viewpath);
  res.render(viewpath);
});

// Handle Errors
app.use(errors);

app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080) + '...');
