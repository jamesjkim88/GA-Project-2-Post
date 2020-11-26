var router = require('express').Router();
var userCtrl = require('../controllers/users');

// GET /students
router.get('/:id', userCtrl.userIndex);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/post/', userCtrl.addPost);

// define authorization function
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/auth/google');
  }
}

module.exports = router;
