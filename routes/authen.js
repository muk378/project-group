var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  /* GET login page. */
  router.get('/login', function(req, res, next) {
    var error = req.flash()['error'];
    var showAnimation = !error ? 'animate' : '';
    res.render('login', {
      title: 'Login',
      loginPageActiveClass: 'active',
      error,
      showAnimation
    });
  });

  // process the login form
  router.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/', // redirect to the secure section
      failureRedirect: '/login', // redirect back to the login page if there is an error

      failureFlash: true // allow flash messages
    })
  );

  // process logout and back to home page
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  return router;
};
