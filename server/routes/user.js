var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

router.get('/', function(req, res, next) {
  res.send('Welcome to REST API server');
});

router.get('/users', userController.findAllUsers);
router.get('/users/:id', userController.findUserById);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;