var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var AWS = require('aws-sdk');
var User = require('../models/user');

var Content = require('../models/content')


/* GET home page. */
router.get('/', function(req, res, next) {
  User.findOne({}, function(err, user){
    res.render('index', { title: 'Express', user: user });

    console.log(user);
  });
});

router.get('/vote', function(req, res, next) {
  User.findOne({}, function(err, user){
    res.render('vote', { title: 'Express', user: user });

    console.log(user);
  });
});

router.get('/upload', function(req, res, next) {
  User.findOne({}, function(err, user){
    res.render('upload', { title: 'Express', user: user });

    console.log(user);
  });
});

router.get('/sign-up', function(req, res, next) {
  User.findOne({}, function(err, user){
    res.render('sign-up', { title: 'Express', user: user });

    console.log(user);
  });
});

router.get('/faq', function(req, res, next) {
  User.findOne({}, function(err, user){
    res.render('faq', { title: 'Express', user: user });

    console.log(user);
  });
});


var Content = require('../models/content');


router.post('/img-upload', function(req,res,next){

  var t = req.body.title;
  var a = req.body.artist;
  var tags = req.body.tags;
  var tArray = tags.split(" ");
  console.log(t);
  console.log(tArray)
  console.log(req.body);
  console.log(req.files);

  //AWS.config.update({     //I don't have the credentials file working yet, so it can be hardcoded here
    //accessKeyId: "XXX",
    //secretAccessKey: "YYY",
  //});

  AWS.config.loadFromPath('./.aws/config.json');


  var s3 = new AWS.S3();


  fs.readFile(req.files.image.path, function (err, data) {
    if (err) { throw err; }
    s3.putObject({
      Bucket: 'artranks3',
      Key: req.files.image.name,
      Body: data,
      ACL: 'public-read'
    },
    function(err,data) {
      if (err) { throw err;}
      else { console.log(data);}
    });

  });
  //console.log(ret);
  //console.log(s3.client.getObjectUrl());
  var img = new Content({
      "title": t,
      "rank": 900,
      "type": "image",
      "tags": tArray,
      "artist": a,
      "comments": [],
      "flags": "none",
      "location": "https://s3-us-west-2.amazonaws.com/artranks3/" + req.files.image.name
  });

  img.save(function (err) {
    if (err) return console.error(err);
    else{
      console.log('woo');
      res.end("File uploaded!");
    }
  });
  fs.unlink(req.files.image.path);
});

module.exports = router;
