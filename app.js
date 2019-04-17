// app.js

//=========================[ Variables ]==============================================
var cookieParser = require('cookie-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var passportConf = require('./config/passport');
var path = require('path');
var serverConf = require('./config/server');
var routes = require('./routes');
var app = express();
var port = serverConf.PORT;


//=========================[ Middleware ]==============================================

// set logger for development's environment
app.use(logger('dev'));

// Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parses incoming requests with JSON payloads (built-in middleware)
app.use(express.json());

// Parses incoming requests with urlencoded payloads (built-in middleware)
app.use(express.urlencoded({ extended: false }));

// Serves static files (built-in middleware)
app.use(express.static(path.join(__dirname, 'public')));

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());


//=========================[ Initialize ]==============================================

// MongoDb - connect to our database
mongoose.connect(serverConf.DB_URL, { useNewUrlParser: true }); // connect to our database

// Passport
passportConf(app, passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routing
routes(app, passport);


//============[ Boostrapper ]===============

app.listen(port, () => console.log('App listening on port ' + port));
