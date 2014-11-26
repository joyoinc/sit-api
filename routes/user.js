var memUserProvider = require('../models/userProvider-mem.js').UserProvider

exports.list = function(req, res){
/*
 * GET users listing.
 */

  res.send("respond with a resource");
};

/// GET all internal users
exports.allInternalUsers = function(req, res){
  var userProvider = new memUserProvider()
  userProvider.iUserList(function(err, result) {
      if(err) throw err
      else res.send(result)
  })
};
/// POST add internal user
exports.addInternalUser = function(req, res){
  var userProvider = new memUserProvider()
  var login = req.param('login')
  var email = req.param('email')
  var passwd = req.param('passwd')
  userProvider.addiUser({login:login,email:email,passwd:passwd}
    , function(err, result) {
      if(err) throw err
      else res.send(result)
  })

};
/// POST auth internal user
exports.authInternalUser = function(req, res){
  var userProvider = new UserProvider()
  var login = req.param('login')
  var passwd = req.param("passwd")
  userProvider.authiUser({ login:login, passwd:passwd }
    , function(err, result) {
      if(err) throw err
      else {
        res.send(result)
      }
  })
};
