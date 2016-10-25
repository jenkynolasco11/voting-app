// Load the env variables
require('dotenv').config();

var express = require('express');
var session = require('express-session');
var MongoConnect = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var local = require('passport-local');


var app = express();
var db = mongoose.connect(process.env.MONGO_URL);

// configure sessions
app.use(session({
  secret : process.env.SESSION_SECRET,
  store: new MongoConnect({ mongooseConnection : db.connection }),
}));


// configure static files
var paths = ['/polls','/auth'];
app.use('/static', express.static('./static'));
paths.forEach(function(path){
  app.use(path, express.static('.' + path));
});

// configure routes
var auth = require('./auth/index');

// set routes
app.use('/auth',  auth);

app.get('/', function(req, res){
  res.render('index');
});

// Configure view settings
app.set('views', paths.concat('/views').map(path => '.' + path));
app.set('view engine', 'pug');

// Views renderer
app.get('/views/:viewpath(*)', function (req, res){
  var viewpath = req.params.viewpath;
  console.log(viewpath);
  res.render(viewpath);
});



app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080) + '...');
