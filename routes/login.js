var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  /* GET login page. */
  router.get('/', function(req, res, next) {
    res.render('login', { LoginPageActiveClass: 'active' });
  });

  // process the login form
  router.post(
    '/',
    passport.authenticate('local-login', {
      successRedirect: '/', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: false // allow flash messages
    })
  );

  return router;
};
