var express =  require('express');
var mongoose = require('mongoose');
var router = express.Router();

require('./pollSchema');

var Polls = mongoose.model('Poll');
var Users = mongoose.model('User');

var isAuthenticated = function(req,res,next){
  console.log('is authenticated ? ' , req.isAuthenticated());
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/#/login');
};

// Return all the polls
router.get('/',/*page/:page',*/ function(req, res){
  // var perPage = 20;
  // var page = req.params.page > 0 ? req.params.page : 0;

  Polls.find({})
    // .limit(perPage)
    // .skip(perPage * page)
    .exec( function(err, polls){
      if(err) {
        console.log('something happened while retrieving the polls...');
        return res.end('');
      }
      res.send({polls : polls});
      // res.render('polls', {
      //   // page:page,
      //   polls : polls,
      // });
    });
});

// Get user polls
router.get('/user', isAuthenticated, function(req,res){
  var user = req.user;
  // console.log('here');
  Users.findOne({username:user.username}, function(err, user){
    if(err){
      console.log('error while trying to get user for his polls');
      return res.redirect('/');
    }
    Polls.find({user : user._id }, function(err, polls){
      if(err){
        console.log('there was an error trying to retrieve user\'s polls');
        return res.redirect('/');
      }
      res.end(JSON.stringify({polls : polls}));
      // res.render('/#/user/polls', {
      //   polls : polls
      // });
    });
  });
});

// Get poll
router.get('/:poll', function(req,res){
  var pollId = req.params.poll;
  Polls.find({id : pollId }, function(err, poll){
    if(err) {
      console.log('something happened while trying to fetch the poll...');
      return res.end('');
    }
    res.end(JSON.stringify({poll : poll}));
    // res.render('poll',{
    //   poll : poll
    // });
  });
});

// Modify votes
// TODO: modify this one later, if answer is not in answers, then add new one
router.put('/:poll/vote', function(req,res){
  var pollId = req.params.poll;
  var answer = req.body.answer;
  Polls.findOne({ id : pollId }, function(err, poll){
    if(err){
      console.log('error trying to fetch poll for update');
      return res.redirect('/');
    }
    if(poll){
      var votes = poll.answers[answer.id].votes;
      poll.answers[answer.id] += 1;

      poll.save(function(err){
        if(err) {
          console.log('error while trying to modify answer');
          return res.redirect('/');
        }
        return res.redirect('/'+pollId);
      });
    } else {
      res.redirect('/');
    }
  });
});

// Remove answers from poll
router.put('/:poll/removeanswers', isAuthenticated, function(req,res){
  var questions = req.body.questions;
  var pollId = req.params.poll;

  Polls.update({id : pollId}, {$pullAll : {answers : {id : { $in : questions}}}}, function(err){
    if(err){
      console.log('there was an error while deleting the poll answers');
      return res.redirect('/');
    }
    res.send('deleted');
  });
  //
  // Polls.findOne({id : pollId}, function(err, poll){
  //   if(err) {
  //     console.log('something happened while trying to fetch the poll');
  //     return res.redirect('/'+pollId);
  //   }
  //
  // });
})

// Add poll
router.post('/add', isAuthenticated, function(req,res){
  var poll = req.body.poll;
  var user = req.user;
  Users.findOne({username : user.username}, function(err,user){
    if(err) {
      console.log('something happened while trying to fetch the user');
      return res.end('');
    }
    if(user){
      var newPoll = new Polls();
      newPoll = poll;
      newPoll.user = user._id;
      newPoll.save(function(err, poll){
        if(err) {
          console.log('something happened while saving new poll');
          return res.end('');
        }

        return res.redirect('/'+poll.id);
      });
    } else {
      console.log('no user was found');
      res.redirect('/');
    }
  });
});

// delete the poll from user
router.delete('/:poll/delete', isAuthenticated, function(req,res){
  var pollId = req.params.poll;
  Polls.find({id : pollId}).remove(function(err){
    if(err) {
      console.log('something happened while deleting a poll');
      return res.redirect('/');
    }
    res.redirect('/');
  })
});

module.exports = router;
