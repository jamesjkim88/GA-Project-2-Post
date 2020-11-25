const User = require('../models/users');

module.exports = {
  index,
  userIndex
};

function userIndex(req, res, next) {
  console.log(req.user, '<------ req.user')
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  // User.find(modelQuery)
  // .sort(sortKey).exec(function(err, user) {
  //   console.log(user, '<----- user');
  //   if (err) return next(err);
  //   // Passing search values, name & sortKey, for use in the EJS
  //   res.render('users/index', {
  //     user
  //   });
  // });
  User.findById(req.params.id, function(err, user){
    console.log(user, "<------");
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

// function userIndex(req, res){
//   User.findById(req.params.id, function(err, user){
//     console.log(user, "<----- users");
//     res.render('users/index', {
//       user
//     })
//   })
// }

// function addFact(req, res, next) {
//   req.user.facts.push(req.body);
//   req.user.save(function(err){
//     res.redirect()
//   })
// }

// function delFact(req, res, next) {
//   Student.findOne({'facts._id': req.params.id}, function(err, student) {
//     student.facts.id(req.params.id).remove();
//     student.save(function(err) {
//       res.redirect('/students');
//     });
//   });
// }
