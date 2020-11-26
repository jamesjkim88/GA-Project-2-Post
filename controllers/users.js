const User = require('../models/users');

module.exports = {
  index,
  userIndex,
  addPost,
  deletePost
};

function userIndex(req, res, next) {
  User.findById(req.params.id, function(err, data){
    console.log(req.user, "<------user");
    res.render('users/index', { user: req.user });
  })
}

function index(req,res){
  User.find({}, function(err, user){
    res.render('index', {
      user
    })
  })
}

function addPost(req, res, next){
  req.user.post.push(req.body);
  console.log(req.user.post, "<===== req.user.post");
  req.user.save(function(err){
    res.redirect(`/${req.user._id}`);
  });
};

function deletePost(req, res, next){
  User.findOne({'post._id' : req.params.id}, function(err, user){
    user.post.id(req.params.id).remove();
    user.save(function(err){
      res.redirect(`/${req.params.id}`);
    })
  })
}