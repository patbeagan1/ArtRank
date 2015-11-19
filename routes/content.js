var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var elo = require('elo-rank')(15);
var User = require('../models/user');
var Content = require('../models/content');

var getRandom = function(upperBound){
  if(upperBound === 1)
    return [1,1];
  var generate = Math.floor(Math.random() * (upperBound))
  var randoms = [generate ,generate];
  do {
      randoms[1] = Math.floor(Math.random() * (upperBound));
    } while(randoms[0] === randoms[1]);
    return randoms;
}

/*Update query not being reflected on db*/
function updateRank(newRank,pieceID){
  console.log(newRank);
  console.log(pieceID);
  Content.update({'_id': pieceID}, {'rank': newRank}).exec();
}

/*Route to query a matchup by type of media and tags*/
router.get('/matchup/:type/:tags', function(req, res, next){
  var tagArray = req.params.tags.split(",");
  Content.find({'type': req.params.type, 'tags': { $all: tagArray }}, function(err, content){

    if(err) {
      return res.send(err);
    }
      var numElements = content.length;
      var random = getRandom(numElements);
      var matchArray = [];
      matchArray.push(content[random[0]]);
      matchArray.push(content[random[1]]);
      //res.json(matchArray);
      console.log(matchArray);
      User.findOne({}, function(err, user){
        res.render('vote', { title: 'Vote', user: user, matchArray: matchArray });
      });
  })
})

router.get('/matchup/:type', function(req, res, next){
  Content.find({'type': req.params.type}, function(err, content){

    if(err) {
      return res.send(err);
    }
      var numElements = content.length;
      var random = getRandom(numElements);
      var matchArray = [];
      matchArray.push(content[random[0]]);
      matchArray.push(content[random[1]]);
      //res.json(matchArray);
      console.log(matchArray);
      User.findOne({}, function(err, user){
        res.render('vote', { title: 'Vote', user: user, matchArray: matchArray });
      });
  })
})

/*Route to post voting result*/
router.post('/vote_result', function(req, res){
  var match = [];
  Content.find({'_id': { $in: [ req.body.winnerID, req.body.loserID ] }}, function(err,content){
    if(err) {
      return res.send(err);
    }
    var playerOne = content[0];
    var playerTwo = content[1];
    var expectedScoreOne = elo.getExpected(playerOne["rank"],playerTwo["rank"]);
    var expectedScoreTwo = elo.getExpected(playerTwo["rank"],playerOne["rank"]);
    var resultOne = elo.updateRating(expectedScoreOne,1,playerOne["rank"]);
    var resultTwo = elo.updateRating(expectedScoreTwo,0,playerTwo["rank"]);
    updateRank(resultOne, playerOne["_id"]);
    updateRank(resultTwo, playerTwo["_id"]);
    //res.send(content);
    res.redirect('back');
  })
})

//API

router.get('/:type', function(req, res, next){
  Content.find({'type': req.params.type}, function(err, content){

    if(err) {
      return res.send(err);
    }
    res.json(content);

  })
})


module.exports = router;
module.exports.getRandom = getRandom;
