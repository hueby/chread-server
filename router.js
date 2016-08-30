const express = require('express');
const _ourController = require('./controllers/_ourController');
const _userController = require('./controllers/_userController');

module.exports = function(app) {
  const apiRoutes = express.Router();

  apiRoutes.get('/helloworld', _ourController.helloworld);
  apiRoutes.get('/user/add/:name/:password', _userController.addUser);
  apiRoutes.get('/user/delete/:name', _userController.deleteUser);
  apiRoutes.get('/user/edit/:name/:toName', _userController.editUser);
  apiRoutes.get('/user/:name', _userController.getUser);

  app.use('/api', apiRoutes);
}

