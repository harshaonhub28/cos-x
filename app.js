const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");

const routes = require('./routes');
//const strategy = require('./config/passport').strategy;

const app = express();
const dbConfig = require('./config/config').dbConfig;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//cors headers
app.use(cors());

passport.use(strategy());
app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((err,req,res,next) => {
  //console.log(err)
  console.log(err.stack);
  next(err);
});

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send("error");
  //res.render('error');
});

dbConnection = dbConfig.dbConnection;
mongoose.Promise = global.Promise;
mongoose.connect(dbConnection)
  .then(() => {
    console.log("Connected to MongoDB", dbConnection);
  }).catch((err) => {
    console.log("Error connecting to mongodb", err);
  });

module.exports = app;
