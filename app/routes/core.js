'use strict';

module.exports = function(app){
  var core = require('../../app/controllers/core.controller');
  app.route('/').get(core.index);
  app.route('/_apis').get(core.endpoints);
  app.route('/_apis/login/auth').post(core.authenticateLogin);
  app.route('/_apis/login/create').post(core.createLogin);
};
