// routes/index.js

module.exports = function(app, passport) {
  var createError = require('http-errors');
  var contactRouter = require('./contact');
  var homeRouter = require('./home');
  var authenRouter = require('./authen');
  var repairingRouter = require('./repairing');

  //======================[ Authenticate Handler ]==============================

  app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.authenticated = req.user !== undefined;
    next();
  });

  //======================[ Routing Config ]==============================
  app.use('/contact', contactRouter);
  app.use('/repairing', repairingRouter);
  app.use('/', homeRouter, authenRouter(passport));

  //======================[ Error Handler ]==============================

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
