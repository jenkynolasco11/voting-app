var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var PollSchema = new mongoose.Schema({
  id : {type : Number, unique : true, required : true},
  user : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'User'},
  question : {type : String, required : true  },
  created_at : { type : Date, default : Date.now()},
  answers : [{
    id : {type : Number, default : 0},
    answer : String,
    votes : Number,
    created_at : { type : Date, default : Date.now()}
  }]
});

// PollSchema.pre('save', function(next){
//   var self = this;
//   var len = self.answers.length;
//
//   self.answers[len-1].id = len;
//
//   next();
// });

PollSchema.plugin(autoIncrement.plugin, {
  model : 'Poll',
  field : 'id',
  startAt : 0,
  incrementBy : 1
});

mongoose.model('Poll', PollSchema);
