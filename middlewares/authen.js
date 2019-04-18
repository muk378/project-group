// middlewares/authen.js

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('login');
  }
};
