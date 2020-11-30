const User = require('../models/users');

module.exports = {
  index,
  userIndex,
  addPost,
  deletePost,
  editView,
  editPost
};

function userIndex(req, res, next) {
  User.findById(req.params.id, function(err, data){
    res.render('users/index', { user: req.user });
  })
}

function index(req,res){
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  User.find(modelQuery, function(err, user){
    console.log(user, "<---- user from index");
    res.render('index', {
      user,
      user1: req.user
    })
  })
}

function addPost(req, res, next){
  req.user.post.push(req.body);
  console.log(req.user.post, "<===== req.user.post");
  req.user.save(function(err){
    res.redirect(`/`);
  });
};

function deletePost(req, res, next){
  User.findOne({'post._id' : req.params.id}, function(err, user){
    user.post.id(req.params.id).remove();
    user.save(function(err){
      res.redirect(`/`);
    })
  })
}

function editPost(req, res){
  console.log(req.body, '<---- req.body from editPost');
  console.log(req.params.id, '<----- req.params.id from editPost');
  User.findOne({'post._id' : req.params.id}, function(err, user){
    console.log(user, '<---- user from editPost function');
    let post = user.post.id(req.params.id);
    console.log(user.post.id(req.params.id), '<----- user.post from editPost');
    post.post = req.body.post;
    user.save(function(err){
      res.redirect(`/`)
    })
  })
}

function editView(req, res){
  console.log(req.user, "<---- req.user from editView");
  res.render('users/update', {
    user: req.user,
    postId: req.params.id
  });
};

