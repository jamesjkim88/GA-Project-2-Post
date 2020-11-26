var router = require('express').Router();
const passport = require('passport');
const userCtrl = require('../controllers/users')

// The root route renders our only view
router.get('/', userCtrl.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    failureRedirect : '/'
  }
), function(req, res){
  res.redirect(`/${req.user._id}`)
}
);

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;