var bcrypt = require("bcrypt")

var iUsers = [
  {login:'xxd', passwd:'$2a$10$3jMz6eIqteQ8cHAHyby94OIcdvXBTUWBdArNnlIfLyEUhMjLyI2uC'} 
  , {login:'xzx', passwd:'$2a$10$4Rte3nQ4JQtC4UN6sv4l3.fMfi9KWJhLZxiEP/QiYg.IIvP014YVu'} 
  , {login:'xhx', passwd:'$2a$10$4Rte3nQ4JQtC4UN6sv4l3.fMfi9KWJhLZxiEP/QiYg.IIvP014YVu'} 
]

var msgs = [
  "auth successfully"
  , "no such user"
  , "auth failed"
]

UserProvider = function(){}

/** Begin
 *  add all function definition here
 */

UserProvider.prototype.resetiUserPasswd= function(obj, callback) {
  callback(null, obj)
}

UserProvider.prototype.addiUser= function(obj, callback) {
  iUsers.push(obj)
  callback(null, obj)
}

UserProvider.prototype.authiUser= function(obj, callback) {
  var errCode = 1
  iUsers.forEach(function(elem){
    if(elem.login===obj.login) {
      if(bcrypt.compareSync(obj.passwd, elem.passwd))
        errCode = 0
      else
        errCode = 2
    }
  })
  callback(null, {errCode:errCode, msg:msgs[errCode]})
}

UserProvider.prototype.iUserList= function(callback) {
  callback(null, iUsers)
}
/** End */

exports.UserProvider = UserProvider
