// Load the env variables
require('dotenv').config();

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var local = require('passport-local');

var app = express();
var db = mongoose.connect(process.env.MONGO_URL)

app.use('/static', express.static('./static'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req,res){
  res.render('index');
});


app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080) + '...');
