var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer  = require('multer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var AWS = require('aws-sdk');


var routes = require('./routes/index');
var users = require('./routes/users');
var content = require('./routes/content');

var app = express();
var s3bucket = new AWS.S3({ params: {Bucket: 'artranks3'} });
app.use(multer({ dest: './uploads'}));



/*Connection to mongolab in parameters*/
mongoose.connect('mongodb://artrankbackend:danadonis123@ds049161.mongolab.com:49161/artrankdb');

var db = mongoose.connection;

//load all files in models dir
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/content', content);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
