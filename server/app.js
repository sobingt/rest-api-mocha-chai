
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

var app = express();

var secrets = require('./config/secrets');
var userRoutes = require('./routes/user.js');

mongoose.connect(secrets.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + secrets.mongoURI[app.settings.env]);
  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './server/public')));

app.use('/', userRoutes);

var server   = http.createServer(app);
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

module.exports = app;