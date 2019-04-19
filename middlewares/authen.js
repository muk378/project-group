// middlewares/authen.js

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else if (req.body.isAdmin) {
    next();
  } else {
    res.redirect('login');
  }
};
