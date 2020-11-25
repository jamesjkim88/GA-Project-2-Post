const User = require('../models/users');

module.exports = {
  index,
  userIndex
};

function userIndex(req, res, next) {
  User.findById(req.params.id, function(err, user){
    console.log(user, "<------user");
    res.render('users/index', { user });
  })
}

function index(req,res){
  User.find({}, function(err, user){
    res.render('index', {
      user
    })
  })
}