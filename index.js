var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();



var db = require('./config/db');
mongoose.connect(db.url);

var port = process.env.PORT || 8080;

// gen an instance of the express router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app);

var server = http.createServer(app);
server.listen(port);
console.log('server started');

exports = module.exports = app;