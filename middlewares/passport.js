// middlewares/passport.js

// expose this function to our app using module.exports
module.exports = function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  // load all the things we need
  var LocalStrategy = require('passport-local').Strategy;

  // load up the user model
  var User = require('../models/user');

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with username
        usernameField: 'userName',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, userName, password, done) {
        // callback with username and password from our form
        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        User.findOne({ userName: userName }, function(err, user) {
          // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no user is found, return the message
          if (!user)
            return done(null, false, {
              message: 'Invalid username or password.'
            });

          // if the user is found but the password is wrong
          if (!user.validPassword(password))
            return done(null, false, {
              message: 'Invalid username or password.'
            });

          // all is well, return successful user
          return done(null, user);
        });
      }
    )
  );
};
