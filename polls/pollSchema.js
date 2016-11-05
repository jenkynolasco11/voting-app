var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  question : String,
  answers : [{
    answer : String,
    votes : Number,
    created_at : { type : Date, default : Date.now()}
  }]
});

mongoose.model('Poll', PollSchema);
