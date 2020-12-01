const User = require('../models/users');

module.exports = {
  index,
  userIndex,
  addPost,
  deletePost,
  editView,
  editPost,
  commentView,
  addComment,
  postView
};

function userIndex(req, res, next) {
  User.findById(req.params.id, function(err, data){
    res.render('users/index', { user: req.user });
  });
};

function index(req,res){
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  User.find(modelQuery, function(err, user){
    res.render('index', {
      user,
      user1: req.user
    })
  })
}

function addPost(req, res, next){
  req.user.post.push(req.body);
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
  User.findOne({'post._id' : req.params.id}, function(err, user){
    let post = user.post.id(req.params.id);
    post.post = req.body.post;
    user.save(function(err){
      res.redirect(`/`)
    })
  })
}

function editView(req, res){
  let post = req.user.post.id(req.params.id);
  res.render('users/update', {
    post,
    user: req.user,
    postId: req.params.id
  });
};

function commentView(req, res){
  User.findOne({'post._id': req.params.id}, function(err, user){
    let post = user.post.id(req.params.id);
    res.render('users/comment', { user, user1: req.user, postId: req.params.id, post });
  });
};

function addComment(req, res){
    let post = req.user.post.id(req.params.id);
  post.comment.push(req.body);
  req.user.save(function(err){
    res.redirect(`/post/${post._id}`)
  })
}

function postView(req, res){
  let post = req.user.post.id(req.params.id);
  res.render('users/post', { user: req.user, post })
}