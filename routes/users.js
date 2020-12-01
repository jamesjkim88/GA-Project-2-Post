var router = require('express').Router();
var userCtrl = require('../controllers/users');

router.get('/user/:id', userCtrl.userIndex);

router.get('/post/:id/comment', userCtrl.commentView);

router.get('/post/:id', userCtrl.postView)

router.post('/post/:id/comment', userCtrl.addComment)

router.post('/post/', userCtrl.addPost);

router.get('/post/:id/edit', userCtrl.editView);

router.put('/post/:id', userCtrl.editPost);

router.delete('/post/:id', userCtrl.deletePost);

// define authorization function
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/auth/google');
  }
}

module.exports = router;
