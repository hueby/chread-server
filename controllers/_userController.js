// CRUD User Methods

var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chread-db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.addUser = function(req, res) {
  User.findOne({ name: req.params.name }, 'name', function(err, user) {
    if (err) res.status(400).json({start: 'Error'});
    if (user === null) {
     // create user
     var newUser = User({
      name: req.params.name,
      password: req.params.password
     });

     newUser.save(function(_err) {
      if (_err) throw _err;
      res.status(200).json({status: '1337'});
     });
    } else {
      res.status(404).json('User exists');
    }
  });
};

exports.deleteUser = function(req, res) {
  User.find({ name: req.params.name }, function(err, users) {
    if (err) throw err;
    if(users.length > 0) {
      users.forEach(function(user) {
        user.remove(function(_err) {
         if (_err) throw _err;
        });
      });
      res.status(200).json('User deleted');
    } else {
      res.status(400).json('User doesnt exist');
    }
  });
};

exports.editUser = function(req, res) {

};

exports.getUser = function(req, res) {
  User.find({ name: req.params.name }, function(err, users) {
    if (users.length !== 0) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ result: 'No user found'});
    }
  });
};
