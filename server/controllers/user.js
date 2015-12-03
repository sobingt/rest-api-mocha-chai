var User = require('../models/User');

exports.findAllUsers = function(req, res) {
  User.find(function(err, users) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(users);
    }
  });
};

exports.findUserById = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(user);
    }
  });
};

exports.addUser = function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': user});
    }
  });
};

exports.updateUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': user});
      }
    });
  });
};

exports.deleteUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      user.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': user});
        }
      });
    }
  });
};